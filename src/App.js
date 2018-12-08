import React, { Component } from 'react';
import Tone from 'tone';

import PlayControls from './PlayControls'
import Controls from './Controls'

import playableVegetables from './PlayableVegetables';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      vegetables: Object.values(playableVegetables),
      loop: new Tone.Loop(this.toneLoopCallback.bind(this), "4n"),
      isMuted: false,
      isPlaying: false,
    }

    this.state.loop.start();
    Tone.Transport.start();

    this.toggleIsAnyVegetablePlaying = this.toggleIsAnyVegetablePlaying.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.toggleVegetablePlay = this.toggleVegetablePlay.bind(this);
  }

  toneLoopCallback(time) {
    this.state.vegetables.map((veggie) => veggie.onLoop(veggie, time));
    this.toggleIsAnyVegetablePlaying()
  }

  toggleIsAnyVegetablePlaying() {
    const isAnyVeggiePlaying = this.state.vegetables.reduce((mem, veggie) => {
      return mem || veggie.isPlaying;
    }, false);

    this.setState({ isPlaying: isAnyVeggiePlaying });
  }

  toggleVegetablePlay(veggieId) {
    const updatedVegetables = this.state.vegetables.map((veggie) => {
      if (veggie.id === veggieId) {
        return Object.assign({}, veggie, { isPlaying: !veggie.isPlaying })
      }
      return veggie;
    })
    this.setState({
      vegetables: updatedVegetables,
    });
  }

  toggleMute() {
    this.setState({ isMuted: !this.state.isMuted }, () => {
      Tone.Master.mute = this.state.isMuted;
    })
  }

  render() {
    const { vegetables } = this.state;
    return (
      <div className="App">
        <PlayControls toggleMute={this.toggleMute} />
        <header className="App-header">
          <h1 className="App-title">
            Pick a vegetable
          </h1>
          <Controls
            vegetables={vegetables}
            toggleVegetable={this.toggleVegetablePlay}
          />
          <div className="Vegetable-Band">
            { vegetables.map(({ isPlaying, component: Component, id }, i) => (
              isPlaying && <Component key={id} />
            ))}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
