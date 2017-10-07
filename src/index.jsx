import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

import { Provider } from 'react-redux';
import Store from './store.js';

ReactDOM.render(
    <Provider store={Store}>
        <App />
    </Provider>,
    document.querySelector('#app')
);
