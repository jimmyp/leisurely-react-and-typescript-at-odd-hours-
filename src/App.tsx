import React, { useState } from 'react';
import './App.css';

type Props = {
  borderColour: 'blue' | 'red'
};

type Image = { url: string; rotation: number };
type AppState = { images: Image[], index: number };

const images: Image[] = [
  'https://pixabay.com/get/g270eabca866bee45a47ffd9cb7720759b947316107f75cb259071bbdb018d21dd833c2c75f9b93458986b0d32c2501e8ab99455190c8862da8a5a610e5bb612d_640.jpg',
  'https://pixabay.com/get/gbd79d11939b1a5f53e4a32d0e52a101c555ee0f904b5bb867b69b35970f5e59c34030383eeef180d58ad3a13b9828954509333e4ff54e254cfe45882a14c2890_640.jpg',
  'https://pixabay.com/get/g834cbd7a99d37031de50711ad1768504b85c6eaeb06b399df7dd0b5057fff4803d88cd63a7ca2214979c01732ad11521e9dc0e96302ccb4e6d64f1827a532614_640.jpg'
].map(img => ({ url: img, rotation: 0 }));

function App(props: Props) {
  const [appState, setAppState] = useState<AppState>({
    images,
    index: 0
  });

  const currentIndex = inBound(appState.index, appState.images.length);
  const currentImage = appState.images[currentIndex];

  const rotateImage = () => {
    setAppState({ 
      ...appState, 
      images: appState.images.map((img, idx) => idx === currentIndex ? { ...img, rotation: img.rotation + 30 } : img) 
    });
  };

  const next = () => setAppState({ ...appState, index: appState.index + 1 });
  const prev = () => setAppState({ ...appState, index: appState.index - 1 });

  return (
    <div className="App">
      <header>
        <img src={ currentImage.url } 
          style={ { 
            transform: `rotate(${currentImage.rotation}deg)`, 
            borderWidth: '2px', 
            borderColor: props.borderColour,
            borderStyle: "solid"
          } } 
          alt="logo" />
      </header>
      <nav style={ { marginTop: '200px' } }>
        <button onClick={ ()=>prev() }>Previous</button>
        <button onClick={ ()=>rotateImage() }>Rotate</button>
        <button onClick={ ()=>next() }>Next</button>
      </nav>
    </div>
  );
}

function inBound(idx: number, length: number): number {
  return ((idx % length) + length) % length;
}

export default App;
