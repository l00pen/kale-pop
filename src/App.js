import React, { Component } from 'react';
import Tone from 'tone';

import PlayControls from './PlayControls'
import Controls from './Controls'

import PlayableVegetables from './PlayableVegetables';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      vegetables: PlayableVegetables,
      loop: new Tone.Loop(this.toneLoopCallback.bind(this), "4n"),
      isMuted: false,
      isPlaying: false,
    }

    this.state.loop.start();
    Tone.Transport.start();

    this.toggleIsAnyVegetablePlaying = this.toggleIsAnyVegetablePlaying.bind(this);
  }

  toneLoopCallback(time) {
    const veggieValueArray = Object.values(this.state.vegetables);

    veggieValueArray.map((veggie) => veggie.onLoop(veggie, time));
    this.toggleIsAnyVegetablePlaying(veggieValueArray)
  }

  toggleIsAnyVegetablePlaying(veggieValueArray) {
    const isAnyVeggiePlaying = veggieValueArray.reduce((mem, veggie) => {
      return mem || veggie.isPlaying;
    }, false);

    this.setState({ isPlaying: isAnyVeggiePlaying });
  }

  toggleVegetablePlay(veggie) {
    const vegetable = this.state.vegetables[veggie];
    this.setState({
      vegetables: Object.assign({}, this.state.vegetables, {
        [veggie]: Object.assign({}, vegetable, { isPlaying: !vegetable.isPlaying }),
      }),
    });
  }

  toggleMute() {
    this.setState({ isMuted: !this.state.isMuted }, () => {
      Tone.Master.mute = this.state.isMuted;
    })
  }

  render() {
    const vegetableArray = Object.values(this.state.vegetables)
    return (
      <div className="App">
        <PlayControls toggleMute={this.toggleMute.bind(this)} />
        <header className="App-header">
          <h1 className="App-title">
            Pick a vegetable
          </h1>
          <Controls
            vegetables={vegetableArray}
            toggleVegetable={this.toggleVegetablePlay.bind(this)}
          />
          <div className="Vegetable-Band">
            { vegetableArray.map(({ isPlaying, tag: Tag, id }, i) => (
              isPlaying && <Tag key={id} />
            ))}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
