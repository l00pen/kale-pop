import React, { Component } from 'react';
import Tone from 'tone';

import PlayControls from './PlayControls'
import Controls from './Controls'
import Kale from './vegetables/Kale';
import Garlic from './vegetables/Garlic';
import Mint from './vegetables/Mint';

import './App.css';

function setupMintInstrument() {
  const polySynth = new Tone.PolySynth(6, Tone.Synth).toMaster();
  polySynth.set("detune", -1200);
  return polySynth
}

function setupGarlicInstrument() {
  const distortion = new Tone.Distortion(0.4).toMaster();
  const synth = new Tone.Synth().toMaster();
  synth.connect(distortion);
  return synth;
}

function setupKaleInstrument() {
  return new Tone.MembraneSynth({
    oscillator : {
      type : 'triangle8'
    },
    envelope : {
      attack : 2,
      decay : 1,
      sustain: 0.4,
      release: 4
    }
  }).toMaster();
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      vegetables: {
        garlic: {
          id: 'garlic',
          label: 'GARLIC',
          isPlaying: false,
          instrument: setupGarlicInstrument(),
        },
        kale: {
          id: 'kale',
          label: 'KALE',
          isPlaying: false,
          instrument: setupKaleInstrument(),
        },
        mint: {
          id: 'mint',
          label: 'MINT',
          isPlaying: false,
          instrument: setupMintInstrument(),
        },
      },
      loop: new Tone.Loop(this.toneLoopCallback.bind(this), "4n"),
      mute: false,
      isPlaying: false,
    }

    this.state.loop.start();
    Tone.Transport.start();
  }

  toneLoopCallback(time) {
    const { kale, garlic, mint } = this.state.vegetables;
    if (garlic.isPlaying) {
      garlic.instrument.triggerAttackRelease('C4', '4n', time * 2)
      garlic.instrument.triggerAttackRelease('E4', '8n', time + Tone.Time('8n'))
      garlic.instrument.triggerAttackRelease('E4', '8n', time + Tone.Time('8n'))
      garlic.instrument.triggerAttackRelease('G4', '16n', time)
      garlic.instrument.triggerAttackRelease('B4', '16n', time + Tone.Time('8t'))
      garlic.instrument.triggerAttackRelease('G4', '16', time + Tone.Time('8t') * 2)
      garlic.instrument.triggerAttackRelease('E4', '2n', time)
    }

    if (kale.isPlaying) {
      kale.instrument.triggerAttackRelease("E2", "8n", time);
    }

    if (mint.isPlaying) {
      mint.instrument.triggerAttackRelease("G4", "2n", time);
    }

    this.setState({ isPlaying: mint.isPlaying || kale.isPlaying || garlic.isPlaying });
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
    this.setState({ mute: !this.state.mute }, () => {
      Tone.Master.mute = this.state.mute;
    })
  }

  render() {
    const { kale, garlic, mint } = this.state.vegetables;
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
            { kale.isPlaying && <Kale />}
            { garlic.isPlaying && <Garlic />}
            { mint.isPlaying && <Mint />}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
