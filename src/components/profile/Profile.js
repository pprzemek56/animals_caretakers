import {useCallback, useEffect, useState} from "react";

import "./Profile.css";

function Profile() {
  const [selectedTab, setSelectedTab] = useState('profile');
  const [userRole, setUserRole] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [employeeData, setEmployeeData] = useState(null);
  const [formInputs, setFormInputs] = useState({});

  const fetchEmployeeData = useCallback(async () => {
    const response = await fetch('http://localhost:5129/api/employees/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      setEmployeeData(data);
      setFormInputs({
        givenName: data.givenName,
        surname: data.surname,
        visitCount: data.visitCount,
        skills: data.skills,
        portfolio: data.portfolio,
        successes: data.succeses,
        expectedSalary: data.expectedSalary
      });
    } else {
      console.error('Failed to fetch employee data');
    }
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (name.endsWith('IsPublic')) {
      const key = name.replace('IsPublic', '');
      setFormInputs(prev => ({
        ...prev,
        [key]: { ...prev[key], isPublic: checked }
      }));
    } else if (['skillsValue', 'portfolioValue', 'successesValue', 'expectedSalaryValue'].includes(name)) {
      const key = name.replace('Value', '');
      setFormInputs(prev => ({
        ...prev,
        [key]: { ...prev[key], value: type === 'number' ? Number(value) : value }
      }));
    } else {
      setFormInputs(prev => ({ ...prev, [name]: value }));
    }
  };

  const updateEmployeeData = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5129/api/employees', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formInputs)
      });
      if (response.ok) {
        console.log('Employee data updated successfully');
        await fetchEmployeeData();
      } else {
        console.error('Failed to update employee data');
      }
    } catch (error) {
      console.error('Error updating employee data', error);
    }
  };

  const deleteEmployeeProfile = async () => {
    const response = await fetch('http://localhost:5129/api/employees', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (response.ok) {
      console.log('Employee profile deleted');
    } else {
      console.error('Failed to delete employee profile');
    }
  };

  const getUserRole = useCallback(() => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const decodedToken = decodeJWT(token);
    return decodedToken ? decodedToken.role : null;
  }, []);

  useEffect(() => {
    if (userRole === 'Employee' && selectedTab === 'profile' && !employeeData) {
      fetchEmployeeData().then();
    }
  }, [userRole, selectedTab, employeeData, fetchEmployeeData]);

  useEffect(() => {
    setUserRole(getUserRole());
  }, [getUserRole]);

  useEffect(() => {
    if (userRole === 'Recruiter' && selectedTab === 'meetings') {
      fetchMeetings().then(r => console.log('Meetings fetched'));
    }
  }, [userRole, selectedTab]);

  const fetchMeetings = async () => {
    try {
      const response = await fetch('http://localhost:5129/api/meetings', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });

      if (response.ok) {
        const data = await response.json();
        setMeetings(data.items);
      } else {
        console.error('Failed to fetch meetings');
      }
    } catch (error) {
      console.error('Error fetching meetings', error);
    }
  };

  const updateMeetingStatus = async (meetingId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5129/api/meetings/${meetingId}/${newStatus}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      });

      if (response.ok) {
        fetchMeetings().then();
      } else {
        console.error('Failed to update meeting status');
      }
    } catch (error) {
      console.error('Error updating meeting status', error);
    }
  };

  const user = {
    name: "John",
    surname: "Pet Owner"
  };

  const getInitials = (name, surname) => {
    return `${name[0]}${surname[0]}`;
  };

  const initials = getInitials(user.name, user.surname);

  const decodeJWT = (token) => {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) =>
          '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));

        return JSON.parse(jsonPayload);
      } catch (e) {
        console.error('Error decoding token', e);
        return null;
      }
  };

  return (
      <div className="flex flex-col items-center p-6 space-y-6">
        <div className="avatar-circle">
          {initials}
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold">{user.name} {user.surname}</h1>
          <p className="text-gray-500 dark:text-gray-400">john.petowner@acme.inc</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            A pet owner looking for a reliable and caring person to take care of my beloved animal.
          </p>
        </div>
        {/* Simple buttons to toggle the tabs */}
        <div className="w-full max-w-md flex justify-center gap-2">
          {/* Additional tab for Recruiters */}
          {userRole === 'Recruiter' && (
            <button onClick={() => setSelectedTab('meetings')}>Meetings</button>
          )}
        </div>
        {/* Meetings tab for Recruiters */}
        {userRole === 'Recruiter' && selectedTab === 'meetings' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Pending Meetings</h2>
            {/* Meetings content */}
            {meetings.length > 0 ? (
              meetings.map((meeting) => (
                <div key={meeting.id} className="meeting-item flex justify-between items-center p-2 border-b">
                  <span>{meeting.givenName} {meeting.surname}</span>
                  {/* Add buttons or other elements to change the status */}
                  <div>
                    <button onClick={() => updateMeetingStatus(meeting.id, 'canceled')} className="m-2 bg-red-500 text-white py-1 px-2 rounded">Cancel</button>
                    <button onClick={() => updateMeetingStatus(meeting.id, 'finished')} className="m-2 bg-green-500 text-white py-1 px-2 rounded">Finish</button>
                  </div>
                </div>
              ))
            ) : (
              <p>No pending meetings.</p>
            )}
          </div>
        )}
        {userRole === 'Employee' && selectedTab === 'profile' && (
        <div className="w-full max-w-2xl">
          <h2 className="text-xl font-bold text-center mb-6">Your Profile</h2>
          {employeeData ? (
            <form onSubmit={updateEmployeeData} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="givenName">
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="givenName"
                  type="text"
                  name="givenName"
                  value={formInputs.givenName || ''}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="surname">
                  Surname
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="surname"
                  type="text"
                  name="surname"
                  value={formInputs.surname || ''}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="skills">
                  Skills
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="skills"
                  name="skillsValue"
                  value={formInputs.skills?.value || ''}
                  onChange={handleInputChange}
                />
                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      name="skillsIsPublic"
                      checked={formInputs.skills?.isPublic || false}
                      onChange={handleInputChange}
                    />
                    <span className="ml-2 text-gray-700 text-sm">Make skills public</span>
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="portfolio">
                  Portfolio
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="portfolio"
                  name="portfolioValue"
                  value={formInputs.portfolio?.value || ''}
                  onChange={handleInputChange}
                />
                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      name="portfolioIsPublic"
                      checked={formInputs.portfolio?.isPublic || false}
                      onChange={handleInputChange}
                    />
                    <span className="ml-2 text-gray-700 text-sm">Make portfolio public</span>
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="succeses">
                  Successes
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="succeses"
                  name="successesValue"
                  value={formInputs.successes?.value || ''}
                  onChange={handleInputChange}
                />
                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      name="successesIsPublic"
                      checked={formInputs.successes?.isPublic || false}
                      onChange={handleInputChange}
                    />
                    <span className="ml-2 text-gray-700 text-sm">Make successes public</span>
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expectedSalary">
                  Expected Salary
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="expectedSalary"
                  name="expectedSalaryValue"
                  value={formInputs.expectedSalary?.value || ''}
                  onChange={handleInputChange}
                />
                <div className="mt-2">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      name="expectedSalaryIsPublic"
                      checked={formInputs.expectedSalary?.isPublic || false}
                      onChange={handleInputChange}
                    />
                    <span className="ml-2 text-gray-700 text-sm">Make expected salary public</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Update Profile
                </button>
                <button
                  onClick={deleteEmployeeProfile}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Delete Profile
                </button>
              </div>
            </form>
          ) : (
            <p className="text-center">Loading profile data...</p>
          )}
        </div>
      )}
      </div>
  );
}

export default Profile;