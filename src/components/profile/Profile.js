import {useCallback, useEffect, useState} from "react";

import "./Profile.css";

function Profile() {
  const [selectedTab, setSelectedTab] = useState('profile');
  const [userRole, setUserRole] = useState(null);
  const [meetings, setMeetings] = useState([]);

  const getUserRole = useCallback(() => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const decodedToken = decodeJWT(token);
    return decodedToken ? decodedToken.role : null;
  }, []);

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

  // Function to extract initials
  const getInitials = (name, surname) => {
    return `${name[0]}${surname[0]}`;
  };

  // User's initials
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
          <button onClick={() => setSelectedTab('profile')}>Profile</button>
          <button onClick={() => setSelectedTab('contact')}>Contact</button>
          <button onClick={() => setSelectedTab('address')}>Address</button>
          <button onClick={() => setSelectedTab('picture')}>Change Picture</button>
          {/* Additional tab for Recruiters */}
          {userRole === 'Recruiter' && (
            <button onClick={() => setSelectedTab('meetings')}>Meetings</button>
          )}
        </div>
        {/* Conditional rendering for tab content */}
        {selectedTab === 'profile' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Profile</h2>
            {/* Profile content */}
            <button className="w-full">Edit Profile</button>
          </div>
        )}
        {selectedTab === 'contact' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Contact</h2>
            {/* Contact content */}
            <button className="w-full">Edit Contact</button>
          </div>
        )}
        {selectedTab === 'address' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Address</h2>
            {/* Address content */}
            <button className="w-full">Edit Address</button>
          </div>
        )}
        {selectedTab === 'picture' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Profile Picture</h2>
            {/* Picture content */}
            <button className="w-full">Change Your Picture</button>
          </div>
        )}
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
      </div>
  );
}

export default Profile;