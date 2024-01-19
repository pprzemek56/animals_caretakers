import {useCallback, useEffect, useState} from "react";

import "./Profile.css";

function Profile() {
  const [selectedTab, setSelectedTab] = useState('profile');
  const [userRole, setUserRole] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [employeeData, setEmployeeData] = useState(null);
  const [formInputs, setFormInputs] = useState({});

  // Function to fetch the employee's profile data
  const fetchEmployeeData = async () => {
    const response = await fetch('/api/employees/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      setEmployeeData(data);
      // Initialize form inputs with fetched data
      setFormInputs({
        givenName: data.givenName,
        surname: data.surname,
        // ... other fields
      });
    } else {
      console.error('Failed to fetch employee data');
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormInputs(prev => ({ ...prev, [name]: value }));
  };

  const updateEmployeeData = async (event) => {
    event.preventDefault();
    // PUT request to update the employee data
    try {
      const response = await fetch('/api/employees', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formInputs)
      });
      if (response.ok) {
        console.log('Employee data updated successfully');
        // Optionally fetch the updated data again
        fetchEmployeeData();
      } else {
        console.error('Failed to update employee data');
      }
    } catch (error) {
      console.error('Error updating employee data', error);
    }
  };

  const deleteEmployeeProfile = async () => {
    const response = await fetch('/api/employees', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (response.ok) {
      console.log('Employee profile deleted');
      // Handle additional logic for after deletion, like redirecting
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
    let isMounted = true;

    const fetchEmployeeData = async () => {
      try {
        const response = await fetch('/api/employees/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (isMounted) {
            setEmployeeData(data);
            setFormInputs({
              givenName: data.givenName,
              surname: data.surname,
              // ... other fields
            });
          }
        } else {
          console.error('Failed to fetch employee data');
        }
      } catch (error) {
        console.error('Error fetching employee data', error);
      }
    };

    if (userRole === 'Employee' && selectedTab === 'profile') {
      fetchEmployeeData().then(r => console.log('Employee data fetched'));
    }

    // Cleanup function to set isMounted to false when the component unmounts
    return () => {
      isMounted = false;
    };
  }, [userRole, selectedTab]);

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
      const response = await fetch('/api/meetings', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          // Other headers if needed
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
      const response = await fetch(`/api/meetings/${meetingId}/${newStatus}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          // Other headers if needed
        }
      });

      if (response.ok) {
        // Fetch updated meetings list
        fetchMeetings().then(r => console.log('Meetings fetched'));
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
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Your Profile</h2>
            {employeeData ? (
              <form onSubmit={updateEmployeeData}>
                <input
                  type="text"
                  name="givenName"
                  value={formInputs.givenName || ''}
                  onChange={handleInputChange}
                  // Add any other necessary attributes
                />
                {/* ... other input fields ... */}
                <button type="submit">Update Profile</button>
              </form>
            ) : (
              <p>Loading profile data...</p>
            )}
            <button onClick={deleteEmployeeProfile} className="bg-red-500 text-white py-1 px-2 rounded">
              Delete Profile
            </button>
          </div>
        )}
      </div>
  );
}

export default Profile;