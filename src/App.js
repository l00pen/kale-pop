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

function garlicLoop(garlic, time) {
  if (garlic.isPlaying) {
    garlic.instrument.triggerAttackRelease('C4', '4n', time * 2)
    garlic.instrument.triggerAttackRelease('E4', '8n', time + Tone.Time('8n'))
    garlic.instrument.triggerAttackRelease('E4', '8n', time + Tone.Time('8n'))
    garlic.instrument.triggerAttackRelease('G4', '16n', time)
    garlic.instrument.triggerAttackRelease('B4', '16n', time + Tone.Time('8t'))
    garlic.instrument.triggerAttackRelease('G4', '16', time + Tone.Time('8t') * 2)
    garlic.instrument.triggerAttackRelease('E4', '2n', time)
  }
}

function kaleLoop(kale, time) {
  if (kale.isPlaying) {
    kale.instrument.triggerAttackRelease("E2", "8n", time);
  }
}

function mintLoop(mint, time) {
  if (mint.isPlaying) {
    mint.instrument.triggerAttackRelease("G4", "2n", time);
  }
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
          onLoop: garlicLoop,
        },
        kale: {
          id: 'kale',
          label: 'KALE',
          isPlaying: false,
          instrument: setupKaleInstrument(),
          onLoop: kaleLoop,
        },
        mint: {
          id: 'mint',
          label: 'MINT',
          isPlaying: false,
          instrument: setupMintInstrument(),
          onLoop: mintLoop,
        },
      },
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
