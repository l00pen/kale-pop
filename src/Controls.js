import React, { Component } from 'react';

import ButtonNice from './ButtonNice'

import './Controls.css';

class Controls extends Component {
  render() {
    const { toggleVegetable } = this.props;
    return (
      <div className="Controls">
        <div className="Controls-item">
          <ButtonNice onClick={() => toggleVegetable('kale')}>
            KALE
          </ButtonNice>
        </div>
        <div className="Controls-item">
          <ButtonNice onClick={() => toggleVegetable('garlic')}>
            GARLIC
          </ButtonNice>
        </div>
        <div className="Controls-item">
          <ButtonNice onClick={() => toggleVegetable('minth')}>
            MINTH
          </ButtonNice>
        </div>
      </div>
    );
  }
}

export default Controls;
