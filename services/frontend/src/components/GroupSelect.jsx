/*eslint-disable*/
import {React, useState} from 'react';
import PropTypes from 'prop-types';

function GroupSelect() {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  }
  return (
    <div className='my-3 w-100 d-flex justify-content-center'>
      <label>Select Group</label>
      <select value={selectedValue} onChange={handleChange} className='form-select w-50'>
        <option value="">Select an option</option>
        <option value="group1">Group 1</option>
        <option value="group2">Group 2</option>
        <option value="group3">Group 3</option>
        <option value="group4">Group 4</option>
      </select>
    </div>
  )
}

export default GroupSelect;
