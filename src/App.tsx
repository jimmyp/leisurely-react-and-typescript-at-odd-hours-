import { connect } from 'react-redux';
import './App.css';
import { LoadImagesAction } from './store';
import Frame from './Frame';
import Controls from './Controls';
import Frame2 from './Frame2';
import React, { useEffect } from 'react';
import Search from './Search';
import { Route, Router, Switch, Link } from 'react-router-dom';
import { appHistory } from './history';

type Props = {
  borderColour: 'blue' | 'red',
  loadImages: () => LoadImagesAction
};

function App(props: Props) {
  useEffect(() => { props.loadImages(); }, []);

  return (
    <Router history={appHistory}>
      <Switch>
        <Route path="/search">
          <Search />
        </Route>
        <Route path="*">
          <header>
            <Frame />
          </header>
          <Controls />
          <Link to="/search">Search</Link>
        </Route>
      </Switch>
    </Router>
  );
}

export default connect(undefined, {
  loadImages: () => ({ type: 'loadImages' as const, payload: { term: 'tiger', size: 'preview' } } as LoadImagesAction)
})(App);
