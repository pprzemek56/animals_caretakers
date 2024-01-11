import {useState} from "react";

import "./Profile.css";

function Profile() {
  const [selectedTab, setSelectedTab] = useState('profile');
  // Example user data, you might be fetching this from an API or state
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
    </div>
  )
}

export default Profile;