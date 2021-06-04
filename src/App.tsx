import React, { memo, useCallback, useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { AppState, initialAppState, Image, selectCurrentImage } from './store';
import Frame from './Frame';
import Controls from './Controls';

type Props = {
  borderColour: 'blue' | 'red'
};

function App(props: Props) {
  return (
    <div className="App">
      <header>
        <Frame />
      </header>
      <nav style={ { marginTop: '200px' } }>
        <Controls />
      </nav>
    </div>
  );
}

export default App;
