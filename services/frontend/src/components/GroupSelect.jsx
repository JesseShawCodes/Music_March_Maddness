/*eslint-disable*/
import {React, useContext} from 'react';
import { Context } from '../components/BracketContext';

function GroupSelect() {
  const value = useContext(Context);
  const [state, dispatch] = value;

  const handleChange = (event) => {
    dispatch({ type: "setSelectedGroup", payload: { selectedGroup: event.target.value } });
  }
  return (
    <div className='my-3 w-100 d-flex justify-content-center'>
      <label>Select Group</label>
      <select value={state.selectedGroup} onChange={handleChange} className='form-select w-50'>
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
