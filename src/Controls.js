import React, { Component } from 'react';

import ButtonNice from './ButtonNice'

import './Controls.css';

class Controls extends Component {
  render() {
    const { vegetables, toggleVegetable } = this.props;
    return (
      <div className="Controls">
        { vegetables.map(({ id, label }) => (
          <div key={id} className="Controls-item">
            <ButtonNice onClick={() => toggleVegetable(id)}>
              {label}
            </ButtonNice>
          </div>
        ))}
      </div>
    );
  }
}

export default Controls;
