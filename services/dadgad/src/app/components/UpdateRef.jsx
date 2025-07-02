import React from "react";
import { useRef, useState } from "react";

export default function UpdateRef() {
  const myRef = useRef(0);
  const [displayValue, setDisplayValue] = useState(myRef.current);

  const handleClick = () => {
    myRef.current = myRef.current + 1;
    setDisplayValue(myRef.current); // Update state to trigger re-render
  };

  return (
    <div>
      <button onClick={handleClick} className="btn btn-primary">
        Update Ref and Display
      </button>
      <p>Current Ref Value: {displayValue}</p>
    </div>
  );
}
