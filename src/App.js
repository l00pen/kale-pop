import React, { Component } from 'react';
import logo from './vegetables/kale.png';
import Tone from 'tone';
import './App.css';

class App extends Component {
  componentDidMount() {
    // var synth = new Tone.Synth().toMaster();
    // var loop = new Tone.Loop(function(time){
    //   synth.triggerAttackRelease("C2", "8n", time);
    // }, "4n");
    // loop.start("1m").stop("4m");
    // Tone.Transport.start();
  }
  
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
      </div>
    );
  }
}

export default App;
