import React from 'react';
import FlowButton from '../FlowButton/FlowButton.js';
import SelectionPeriod from '../SelectionPeriod/SelectionPeriod.js';
import css from './SelectionBar.module.css';

export default function SelectionBar(props) {
  const {
    periods,
    propHandleChangeSelected,
    selected,
    propGoBack,
    propGoAhead,
  } = props;

  return (
    <div className={css.flexRow}>
      <FlowButton
        propClassName="waves-effect waves-light btn"
        char="<"
        propOnClick={propGoBack}
      />
      <SelectionPeriod
        propClassName="input-field"
        periods={periods}
        selected={selected}
        propOnChange={propHandleChangeSelected}
      />
      <FlowButton
        propClassName="waves-effect waves-light btn"
        char=">"
        propOnClick={propGoAhead}
      />
    </div>
  );
}
