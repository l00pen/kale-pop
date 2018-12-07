import React from 'react';

import './ButtonNicer.css';

const ButtonNicer = ({ onClick, children }) => (
  <button className="Button-Nicer" onClick={onClick}>
    {children}
  </button>
);

export default ButtonNicer;
