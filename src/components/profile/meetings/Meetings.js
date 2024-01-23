import React, { useState, useEffect } from 'react';

const Meetings = ({ updateMeetingStatus }) => {
  const [meetings, setMeetings] = useState([]);
  const [displayedMeetings, setDisplayedMeetings] = useState([]);
  const [nextIndex, setNextIndex] = useState(3);

  useEffect(() => {
    fetchMeetings().then();
  }, []);

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
        setDisplayedMeetings(data.items.slice(0, 3));
      } else {
        console.error('Failed to fetch meetings');
      }
    } catch (error) {
      console.error('Error fetching meetings', error);
    }
  };

  const loadMoreMeetings = () => {
    const moreMeetings = meetings.slice(nextIndex, nextIndex + 3);
    setDisplayedMeetings(displayedMeetings.concat(moreMeetings));
    setNextIndex(nextIndex + 3);
  };

  const sortMeetings = (field, ascending = true) => {
    const sortedMeetings = [...meetings].sort((a, b) => {
      if (a[field] < b[field]) return ascending ? -1 : 1;
      if (a[field] > b[field]) return ascending ? 1 : -1;
      return 0;
    });
    setMeetings(sortedMeetings);
    setDisplayedMeetings(sortedMeetings.slice(0, nextIndex));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Pending Meetings</h2>

      {/* Sorting Options */}
      <div className="flex justify-between mb-4">
        <button onClick={() => sortMeetings('status')}>Sort by Status</button>
        <button onClick={() => sortMeetings('meetingDate')}>Sort by Date</button>
        <button onClick={() => sortMeetings('givenName')}>Sort by Name</button>
      </div>

      {/* Meetings content */}
      <div className="grid grid-cols-3 gap-4">
        {displayedMeetings.length > 0 ? (
          displayedMeetings.map((meeting) => (
            <div key={meeting.id} className="meeting-item flex flex-col items-center p-4 border">
              <span>{meeting.givenName} {meeting.surname}</span>
              <span>{new Date(meeting.meetingDate).toLocaleString()}</span>
              <span>Status: {meeting.status}</span>
              <div className="flex mt-2">
                <button onClick={() => updateMeetingStatus(meeting.id, 'canceled')} className="m-2 bg-red-500 text-white py-1 px-2 rounded">Cancel</button>
                <button onClick={() => updateMeetingStatus(meeting.id, 'finished')} className="m-2 bg-green-500 text-white py-1 px-2 rounded">Finish</button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-3">No pending meetings.</p>
        )}
      </div>

      {/* Load More Button */}
      {nextIndex < meetings.length && (
        <div className="text-center">
          <button onClick={loadMoreMeetings} className="bg-blue-500 text-white py-1 px-2 rounded">Load More</button>
        </div>
      )}
    </div>
  );
};

export default Meetings;
