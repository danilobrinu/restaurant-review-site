import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import './styles.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

library.add(fas);

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
