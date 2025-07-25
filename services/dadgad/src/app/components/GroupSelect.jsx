import { React, useContext } from 'react';
import { Context } from '../context/BracketContext';

function GroupSelect({ groups }) {
  const value = useContext(Context);
  const [state, dispatch] = value;

  const selectGroup = (event) => {
    dispatch({ type: 'setSelectedGroup', payload: { selectedGroup: event.target.value } });
  };
  return (
    <div className="my-3 w-100 d-flex justify-content-center">
      <label htmlFor="group-select">Select Group</label>
      <select 
        value={state.selectedGroup}
        id="group-select"
        onChange={selectGroup} 
        className="form-select w-50"
      >
        <option value="all">All</option>
        {
          groups.map((group) => (
            <option key={group.id} value={group.name}>
              {group.name}
            </option>
          ))
        }
      </select>
    </div>
  );
}

export default GroupSelect;
