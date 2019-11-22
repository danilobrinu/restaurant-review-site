import React from 'react';
import { useMachine } from '@xstate/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import './App.css';

////////////////////////////////////////////////////////////////////////////////////////////////////

import { restauranReviewSiteMachine } from './review-restaurant-machine';

////////////////////////////////////////////////////////////////////////////////////////////////////

import HomePage from './screens/Home';
import PlacePage from './screens/Place';
import PlacesPage from './screens/Places';

////////////////////////////////////////////////////////////////////////////////////////////////////

library.add(fas);

function Reviewer() {
  const mapRef = React.useRef();
  const [current, send] = useMachine(restauranReviewSiteMachine);

  React.useEffect(() => {
    console.log(current);
  }, [current]);

  console.log(current);

  return (
    <div className="absolute inset-0">
      <div className="flex relative w-full h-full overflow-hidden">
        <div className="flex-initial relative w-full max-w-xl h-full shadow-xl">
          <div className="relative w-full max-h-full overflow-x-hidden overflow-y-auto">
            <Router>
              <Switch>
                <Route path="/places/:placeId">
                  <PlacePage />
                </Route>
                <Route path="/places">
                  <PlacesPage />
                </Route>
                <Route path="/">
                  <HomePage />
                </Route>
              </Switch>
            </Router>
          </div>
        </div>

        <div className="flex-auto relative">
          <div ref={mapRef} className="absolute inset-0" />
        </div>
      </div>
    </div>
  );
}

function App() {
  return <Reviewer />;
}

export default App;
