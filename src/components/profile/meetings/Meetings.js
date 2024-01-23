import React, { useState, useEffect } from 'react';

const Meetings = ({ updateMeetingStatus }) => {
  const [meetings, setMeetings] = useState([]);
  const [displayedMeetings, setDisplayedMeetings] = useState([]);
  const [nextIndex, setNextIndex] = useState(3);
  const [filters, setFilters] = useState({
    name: '',
    surname: '',
    status: '',
    fromDate: '',
    toDate: ''
  });

  useEffect(() => {
    fetchMeetings().then();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, meetings]);

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

  const applyFilters = () => {
    let filteredMeetings = meetings;

    // Filter by name
    if (filters.name) {
      filteredMeetings = filteredMeetings.filter(meeting =>
        meeting.givenName.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    // Filter by surname
    if (filters.surname) {
      filteredMeetings = filteredMeetings.filter(meeting =>
        meeting.surname.toLowerCase().includes(filters.surname.toLowerCase())
      );
    }

    // Filter by status
    if (filters.status) {
      filteredMeetings = filteredMeetings.filter(meeting =>
        getStatus(meeting.status) === filters.status
      );
    }

    // Filter by date range
    const fromDate = filters.fromDate ? new Date(filters.fromDate) : null;
    const toDate = filters.toDate ? new Date(filters.toDate) : null;
    if (fromDate && toDate) {
      filteredMeetings = filteredMeetings.filter(meeting => {
        const meetingDate = new Date(meeting.meetingDate);
        return meetingDate >= fromDate && meetingDate <= toDate;
      });
    }

    setDisplayedMeetings(filteredMeetings.slice(0, nextIndex));
  };

  const getStatus = (statusCode) => {
    const statusMap = {
      0: 'New',
      1: 'Cancelled',
      2: 'Finished'
    };
    return statusMap[statusCode] || 'Unknown';
  };

  const handleFilterChange = (field, value) => {
    setFilters({
      ...filters,
      [field]: value
    });
  };

  const clearDateFilters = () => {
    setFilters({
      ...filters,
      fromDate: '',
      toDate: ''
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-center">Pending Meetings</h2>

      {/* First row of filters */}
      <div className="flex flex-wrap justify-between mb-2">
        <input
          type="text"
          placeholder="Name"
          value={filters.name}
          onChange={(e) => handleFilterChange('name', e.target.value)}
          className="mb-2"
        />
        <input
          type="text"
          placeholder="Surname"
          value={filters.surname}
          onChange={(e) => handleFilterChange('surname', e.target.value)}
          className="mb-2"
        />
        <select
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="mb-2"
        >
          <option value="">All Statuses</option>
          <option value="New">New</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Finished">Finished</option>
        </select>
      </div>

      {/* Second row of filters */}
      <div className="flex flex-wrap justify-between">
        <input
          type="date"
          placeholder="From Date"
          value={filters.fromDate}
          onChange={(e) => handleFilterChange('fromDate', e.target.value)}
          className="mb-2"
        />
        <button
          onClick={clearDateFilters}
          className="bg-gray-300 hover:bg-gray-400 text-black py-1 px-2 rounded"
        >
          Clear Data
        </button>
        <input
          type="date"
          placeholder="To Date"
          value={filters.toDate}
          onChange={(e) => handleFilterChange('toDate', e.target.value)}
          className="mb-2"
        />
      </div>

      {/* Meetings content */}
      <div className="grid grid-cols-3 gap-4">
        {displayedMeetings.length > 0 ? (
          displayedMeetings.map((meeting) => (
            <div key={meeting.id} className="meeting-item flex flex-col items-center p-4 border">
              <span>{meeting.givenName} {meeting.surname}</span>
              <span>{new Date(meeting.meetingDate).toLocaleString()}</span>
              <span>Status: {getStatus(meeting.status)}</span>
              <div className="flex mt-2">
                <button onClick={() => updateMeetingStatus(meeting.id, 'canceled')} className="m-2 bg-red-500 text-white py-1 px-2 rounded">Cancel</button>
                <button onClick={() => updateMeetingStatus(meeting.id, 'finished')} className="m-2 bg-green-500 text-white py-1 px-2 rounded">Finish</button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center">No pending meetings.</p>
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
