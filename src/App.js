import React, { Component } from 'react';
import Tone from 'tone';

import ButtonNice from './ButtonNice'
import Kale from './vegetables/Kale';
import Garlic from './vegetables/Garlic';
import Minth from './vegetables/Minth';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      garlic: false,
      kale: false,
      minth: false,
      synth: new Tone.Synth().toMaster(),
      bass: new Tone.MembraneSynth({
        oscillator : {
          type : 'triangle8'
        },
        envelope : {
          attack : 2,
          decay : 1,
          sustain: 0.4,
          release: 4
        }
      }).toMaster(),
      minthSynth: new Tone.PolySynth(6, Tone.Synth).toMaster(),
      loop: new Tone.Loop(this.toneLoopCallback.bind(this), "4n"),
    }

    this.state.minthSynth.set("detune", -1200);

    const distortion = new Tone.Distortion(0.4).toMaster();
    const pwm = new Tone.PWMOscillator("Bb3").toMaster();

    this.state.synth.connect(distortion);
    // this.state.synth.connect(pwm);

    this.state.loop.start();
    Tone.Transport.start();
  }

  toneLoopCallback(time) {
    if (this.state.garlic) {
      console.log(time * 2, Tone.Time('8n'), time)
      this.state.synth.triggerAttackRelease('C4', '4n', time * 2)
      this.state.synth.triggerAttackRelease('E4', '8n', time + Tone.Time('8n'))
      this.state.synth.triggerAttackRelease('E4', '8n', time + Tone.Time('8n'))
      this.state.synth.triggerAttackRelease('G4', '16n', time)
      this.state.synth.triggerAttackRelease('B4', '16n', time + Tone.Time('8t'))
      this.state.synth.triggerAttackRelease('G4', '16', time + Tone.Time('8t') * 2)
      this.state.synth.triggerAttackRelease('E4', '2n', time)
    }

    if (this.state.kale) {
      this.state.bass.triggerAttackRelease("E2", "8n", time);
    }

    if (this.state.minth) {
      var chord = new Tone.Event(function(time, chord){
        //the chord as well as the exact time of the event
        //are passed in as arguments to the callback function
      }, ["D4", "E4", "F4"]);
      //start the chord at the beginning of the transport timeline
      chord.start(time);
      //loop it every measure for 8 measures
      chord.loop = 8;
    }
  }

  toggleVegetable(veggie) {
    this.setState({ [veggie]: !this.state[veggie] })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Pick a vegetable
          </p>
          <div className="Controls">
            <ButtonNice onClick={this.toggleVegetable.bind(this, 'kale')}>
              KALE
            </ButtonNice>
            <ButtonNice onClick={this.toggleVegetable.bind(this, 'garlic')}>
              GARLIC
            </ButtonNice>
            <ButtonNice onClick={this.toggleVegetable.bind(this, 'minth')}>
              MINTH
            </ButtonNice>
          </div>
          <div className="Vegetable-Band">
            { this.state.kale &&
              <Kale />
            }
            { this.state.garlic &&
              <Garlic />
            }
            { this.state.minth &&
              <Minth />
            }
          </div>
        </header>
      </div>
    );
  }
}

export default App;
