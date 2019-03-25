import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import './index.css'

import { createStore } from 'redux';
import rootReducer from './store/modules'
import { Provider } from 'react-redux';

const devTools = 
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(rootReducer, devTools);
console.log(store.getState());

ReactDOM.render(
	<Provider store={store}>
	<App/>
	</Provider>,
	document.getElementById('root')
);
