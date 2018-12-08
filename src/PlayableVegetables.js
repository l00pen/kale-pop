import Tone from 'tone';

import Kale from './vegetables/Kale';
import Garlic from './vegetables/Garlic';
import Mint from './vegetables/Mint';

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

const vegetables = {
  garlic: {
    id: 'garlic',
    label: 'GARLIC',
    isPlaying: false,
    instrument: setupGarlicInstrument(),
    onLoop: garlicLoop,
    component: Garlic,
  },
  kale: {
    id: 'kale',
    label: 'KALE',
    isPlaying: false,
    instrument: setupKaleInstrument(),
    onLoop: kaleLoop,
    component: Kale,
  },
  mint: {
    id: 'mint',
    label: 'MINT',
    isPlaying: false,
    instrument: setupMintInstrument(),
    onLoop: mintLoop,
    component: Mint,
  },
};

export default vegetables;