import { connect } from 'react-redux';
import './App.css';
import { LoadImagesAction } from './store';
import Frame from './Frame';
import Controls from './Controls';
import Frame2 from './Frame2';
import { useEffect } from 'react';

type Props = {
  borderColour: 'blue' | 'red',
  loadImages: () => LoadImagesAction
};

function App(props: Props) {
  useEffect(() => { props.loadImages(); }, []);

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

export default connect(undefined, {
  loadImages: () => ({ type: 'loadImages' as const, payload: 'tiger' })
})(App);
