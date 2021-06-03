import React, { memo, useCallback, useContext, useEffect, useState } from 'react';
import './App.css';
import { AppState, initialAppState, Image } from './store';

type Props = {
  borderColour: 'blue' | 'red'
};

function App(props: Props) {
  const appState = initialAppState;
  const setAppState = (fn: (preState: any) => null) => null;

  const currentIndex = inBound(appState.index, appState.images.length);
  const currentImage = appState.images[currentIndex];

  const getCurrentImage = (st: AppState) => st.images.map((img, idx) => idx === currentIndex ? { ...img, rotation: img.rotation + 30 } : img);

  const rotateImage = () => console.log('rotate');

  const next = () => console.log('next');
  const prev = () => console.log('pre');

  return (
    <div className="App">
      <header>
        <Frame image={currentImage} />
      </header>
      <nav style={ { marginTop: '200px' } }>
        <Controls next={next} prev={prev} rotateImage={rotateImage} />
      </nav>
    </div>
  );
}

type ControlsProps = {
  prev: () => void,
  rotateImage: () => void,
  next: () => void,
}

const Controls = memo((props: ControlsProps) => {
  const { prev, next, rotateImage } = props;
  return (
    <>
      <button onClick={ ()=>prev() }>Previous</button>
      <button onClick={ ()=>rotateImage() }>Rotate</button>
      <button onClick={ ()=>next() }>Next</button>
    </>
  );
});

type FrameProps = { image: Image };
function Frame(props: FrameProps) {
  return (
    <img src={ props.image.url } 
    style={ { 
      transform: `rotate(${props.image.rotation}deg)`, 
      borderWidth: '2px', 
      borderStyle: "solid"
    } } 
    alt="logo" />
  );
}

function inBound(idx: number, length: number): number {
  return ((idx % length) + length) % length;
}

export default App;
