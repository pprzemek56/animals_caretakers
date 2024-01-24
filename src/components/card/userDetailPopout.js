import React from 'react';

const UserDetailPopup = ({ user, onClose }) => {
  return (
    <div className="user-detail-popup">
    <div>
    <div className='pb-4 content-center'>
      <div className="avatar-circle">
                {user.givenName[0]}{user.surname[0]}
    </div>
    </div>
        <h2 className='user-name'>{`${user.givenName} ${user.surname}`}</h2>
        <div className='items'>
        {user.visitCount && <p>{`Visit count: ${user.visitCount}`}</p>}
        {user.description && <p>{`Description: ${user.description}`}</p>}
        {user.skills && user.skills.value && <p>{`Skills: ${user.skills.value}`}</p>}
        {user.portfolio && user.portfolio.value && <p>{`Portfolio: ${user.portfolio.value}`}</p>}
        {user.succeses && user.succeses.value && <p>{`Succeses: ${user.succeses.value}`}</p>}
        {user.expectedSalary && user.expectedSalary.value && <p>{`Expected Salary: ${user.expectedSalary.value} PLN`}</p>}
        </div>
    </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default UserDetailPopup;