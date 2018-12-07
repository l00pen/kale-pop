import React from 'react';

import './ButtonNice.css';

const ButtonNice = ({ onClick, children }) => (
  <button className="Button-Nice" onClick={onClick}>
    {children}
  </button>
);

export default ButtonNice;
