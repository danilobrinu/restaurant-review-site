import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import './App.css';

////////////////////////////////////////////////////////////////////////////////////////////////////

import { AppProvider } from './app-context';

////////////////////////////////////////////////////////////////////////////////////////////////////

import HomePage from './screens/Home';
import PlacePage from './screens/Place';
import PlacesPage from './screens/Places';

////////////////////////////////////////////////////////////////////////////////////////////////////

library.add(fas);

const initialState = {};
const reducer = (state = {}, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};

function App() {
  return (
    <AppProvider initialState={initialState} reducer={reducer}>
      <Router>
        <Switch>
          <Route path="/places/:placeId" component={PlacePage} />
          <Route path="/places" component={PlacesPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </Router>
    </AppProvider>
  );
}

export default App;
