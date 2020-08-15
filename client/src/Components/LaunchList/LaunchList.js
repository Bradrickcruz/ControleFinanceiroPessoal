import React from 'react';
import LaunchItem from '../LaunchItem/LaunchItem.js';

export default function LaunchList(props) {
  const { launches, propEditButton, propDeleteButton } = props;

  const handleEditClick = (LaunchId) => {
    propEditButton(LaunchId);
  };

  const handleDeleteClick = (LaunchId) => {
    propDeleteButton(LaunchId);
  };

  return (
    <div>
      {launches.map((launch) => {
        return (
          <LaunchItem
            key={launch._id}
            launchInfo={launch}
            propHandleEditLaunch={handleEditClick}
            propHandleDeleteLaunch={handleDeleteClick}
          />
        );
      })}
    </div>
  );
}
