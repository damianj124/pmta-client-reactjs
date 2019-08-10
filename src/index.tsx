import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import App from './App';
import './index.css';
import { AUTHENTICATED } from './actions/types';
import "./assets/scss/main.css";
import { composeWithDevTools } from 'redux-devtools-extension';

// http://definitelytyped.org/

const store = createStore(reducers, {}, composeWithDevTools(applyMiddleware(reduxThunk)));


const user = localStorage.getItem('pmt-token');
const userData = JSON.parse(localStorage.getItem('pmt-user-data') || '{}');

if(user) {
    store.dispatch({ type: AUTHENTICATED, payload: userData});
}

const app = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(app, document.getElementById('root') as HTMLElement);
