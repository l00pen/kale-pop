import React, { Component } from 'react';

import ButtonNicer from './ButtonNicer'

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
    }
  }

  toggleExpand() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  render() {
    const { toggleMute } = this.props;
    return (
      <div className={ this.state.expanded ? 'Play-Controls expanded' : 'Play-Controls'}>
        <div className="Content">
          <ButtonNicer onClick={toggleMute}>
            { this.state.mute ? 'UNMUTE' : 'MUTE' }
          </ButtonNicer>
        </div>
        <button className="Button-Invisible" onClick={this.toggleExpand.bind(this)}>{this.state.expanded ? '<' : '>'}</button>
      </div>
    );
  }
}

export default App;
