import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { updateData } from 'Actions';
import Store from './store.js';
import PokeCache from './fetch.js';

//
//
window._compare = id => {
    Store.dispatch({type : 'COMPARE_ADD_ITEM', payload: id});
};
window._comp = d => {
    Store.dispatch({type : 'COMPARE_UPDATE_DATA', payload: d});
};
//
//

const onLoad = function onDomConentLoaded () {
    // Remove unnecessary Event Listener
    document.removeEventListener('DOMContentLoaded', onLoad);
    // Add global object that will handle fetch requests
    window.__fetchlist = {
        list : [],
        ab : function () {
            this.list.forEach(e => {
                e.abort();
            });
            this.list = [];
        },
        ad : function (inst) {
            this.list.push(inst);
        },
        rm : function (id) {
            this.list = this.list.filter(e => e.__id !== id);
        },
    };
    // Load pokelist data
    new PokeCache().get().then(d => Store.dispatch(updateData(d)));
    // ReactDOM render
    ReactDOM.render(
        <Provider store={Store}>
            <App />
        </Provider>,
        document.querySelector('#app')
    );
    // Greet Console Readers
    console.log(`
    ░░░░░░░░░░░░▄▄▄▄▄▄▄▄▄▄▄▄▄░░░░░░░░░░░░
    ░░░░░░▄▄████▀▀▀▀▀░░░░░░▀▀█▄▄░░░░░░░░░
    ░░░▄██▀▀░░░░░░░░░░░░░░░░░░▀██▄░░░░░░░
    ░░▄█▀░░░░░░░░░░░░░░░░░░░░░░░░▀█▄░░░░░
    ░██░░░░░░░░░░░░░░░░░░░░░░░░░░░▀█▄░░░░
    ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▀█▄░░░
    ██░░░░░░░░░░░░░░░░░░░░░░░░░▄▄▄░░▀█░░░
    █░░░░░░░░░░░░░░░░░░░░░░░░░░▀██▄░░██░░
    █░░░░░████░░░░░░░░░░░░░░░░░░░░░░░░█▄░
    █░░░░░▀▀▀█░░░░░░░░░░░░░░░░░░░░░░░░██░
    █░░░░░░░░░░░░░░░░░░░░░░░▄▄▄▄█████▀░█▄
    █░░░░░░░░░░▄▄▄▄▄██████▀▀▀▀▀▀░░░░░░░██
    █░░░░▄█████▀▀▀▀▀░▄▄▄████░░░░░░░░░░░██
    ██░░░░░░░░░░░░░░░░▀░░░░░░░░░░░░░░░░██
    ▀█▄░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░█▀
    ░▀█░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░▄█░
    ░░██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░██░
    ░░░██░░░░░░░░░░░░░░░░░░░░░░░░░░░░▄█░░
    ░░░░▀██▄░░░░░░░░░░░░░░░░░░░░░░▄▄█▀░░░
    ░░░░░░▀██▄░░░░░░░░░░░░░░░░░▄▄█▀░░░░░░
    ░░░░░░░░░▀██▄░░░░░░░░░░░▄▄█▀░░░░░░░░░
    ░░░░░░░░░░░░▀██▄▄▄▄▄▄▄▄█▀░░░░░░░░░░░░
    ░░░░░░░░░░░░░░░░░░█░░░░░░░░░░░░░░░░░░
    ░░░░░░░░░░░░░░░░░░█░░░░░░░░░░░░░░░░░░
    ░░░░░░░░░░░░░░░░░░█░░░░░░░░░░░░░░░░░░
    ░░░░░░░░░░░░░░░░░░█░░░░░░░░░░░░░░░░░░
    ░░░░░░░░░░░░░░░░░░█░░░░░░░░░░░░░░░░░░
    ░░░░░░░░░░░░░░░░░░█░░░░░░░░░░░░░░░░░░`);
}

document.addEventListener('DOMContentLoaded', onLoad);
