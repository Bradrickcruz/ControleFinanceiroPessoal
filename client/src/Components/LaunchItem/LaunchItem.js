import React from 'react';
import {
  formatToRealCurrency,
  addSymbolLeft,
} from '../../Helpers/formatHelpers.js';
import css from './LaunchItem.module.css';

export default function LaunchItem(props) {
  const { launchInfo, propHandleEditLaunch, propHandleDeleteLaunch } = props;

  const handleEditButtonClick = () => {
    propHandleEditLaunch(id);
  };

  const handleDeleteButtonClick = () => {
    propHandleDeleteLaunch(id);
  };

  const { _id: id, day, category, description, value } = launchInfo;

  return (
    <div
      className={[
        css.flexRow,
        launchInfo.type === '-' ? 'red lighten-3' : 'green lighten-3',
      ].join(' ')}
    >
      <span className={css.day}>{addSymbolLeft(day, '0', 2)}</span>
      <div className={css.info}>
        <p id="category" className={css.category}>
          {category}
        </p>
        <p id="description" className={css.description}>
          {description}
        </p>
      </div>
      <span id="value" className={css.value}>
        {formatToRealCurrency(value)}
      </span>
      <div className={css.icons}>
        <i
          style={{ cursor: 'pointer' }}
          onClick={handleEditButtonClick}
          className="small material-icons"
        >
          edit
        </i>
        <i
          style={{ cursor: 'pointer' }}
          onClick={handleDeleteButtonClick}
          className="small material-icons"
        >
          delete
        </i>
      </div>
    </div>
  );
}
