import React, { Component } from 'react';
import logo from './vegetables/kale.png';
import music from './ma_lill_loop.mp3';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-logo">
            <img src={logo} className="Kale-Pop" alt="logo" />
          </div>
          <p>
            Pick a vegetable
          </p>
          <div>
            <button>TOMATO</button>
            <button>SELLERI</button>
            <button>AVOCADO</button>
          </div>
        </header>
        <audio
          // autoPlay
          loop
          src={music}
        />
      </div>
    );
  }
}

export default App;
