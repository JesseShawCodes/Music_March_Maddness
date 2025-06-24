// src/app/components/Bracket.jsx

import React, { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import p5 with ssr: false
const P5Wrapper = dynamic(() => import('./P5Wrapper'), { ssr: false });

const Bracket = () => {
  return (
    <div>
      <h1>My P5 Bracket</h1>
      <P5Wrapper />
    </div>
  );
};

export default Bracket;
