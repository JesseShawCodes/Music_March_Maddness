import { React, useContext } from 'react';
import BackToTop from './BackToTop';
import ThemeButton from './ThemeButton';

function FloatingControls() {
  return (
    <div className="floating-controls">
      <ThemeButton />
      <BackToTop />
    </div>
  );
}

export default FloatingControls;
