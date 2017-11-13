import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Store from './store';
import PokeCache from './fetch';
import { Provider } from 'react-redux';
import { updateData } from 'Actions';
import {
    HashRouter,
    Route,
} from 'react-router-dom';

const onLoad = function onDomConentLoaded () {
    document.removeEventListener('DOMContentLoaded', onLoad);
    window.__fetchlist = {
        list : [],
        ab : function () {
            this.list.forEach(e => {
                e.abort();
            });
        },
        ad : function (inst) {
            this.list.push(inst);
        },
        rm : function (id) {
            this.list = this.list.filter(e => e.__id !== id);
        },
        has : function (reqID) {
            const req = this.list.find(f => f.__reqID === reqID);
            if (req) {
                req.__isAborted = false;
                return true;
            }
            return false;
        }
    };
    new PokeCache().get(undefined, 'pokelistundefined').then(d => Store.dispatch(updateData(d)));
    ReactDOM.render(
        <Provider store={Store}>
            <HashRouter>
                <Route path="/:pageName?/:subpage?/:id?" component={App} />
            </HashRouter>
        </Provider>,
        document.querySelector('#app')
    );
    console.log(`%c░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
░░░░░░░░░░░░░▄▄▄▄▄▄▄░░░░░░░░░
░░░░░░░░░▄▀▀▀░░░░░░░▀▄░░░░░░░
░░░░░░░▄▀░░░░░░░░░░░░▀▄░░░░░░
░░░░░░▄▀░░░░░░░░░░▄▀▀▄▀▄░░░░░
░░░░▄▀░░░░░░░░░░▄▀░░██▄▀▄░░░░
░░░▄▀░░▄▀▀▀▄░░░░█░░░▀▀░█▀▄░░░
░░░█░░█▄▄░░░█░░░▀▄░░░░░▐░█░░░
░░▐▌░░█▀▀░░▄▀░░░░░▀▄▄▄▄▀░░█░░
░░▐▌░░█░░░▄▀░░░░░░░░░░░░░░█░░
░░▐▌░░░▀▀▀░░░░░░░░░░░░░░░░▐▌░
░░▐▌░░░░░░░░░░░░░░░▄░░░░░░▐▌░
░░▐▌░░░░░░░░░▄░░░░░█░░░░░░▐▌░
░░░█░░░░░░░░░▀█▄░░▄█░░░░░░▐▌░
░░░▐▌░░░░░░░░░░▀▀▀▀░░░░░░░▐▌░
░░░░█░░░░░░░░░░░░░░░░░░░░░█░░
░░░░▐▌▀▄░░░░░░░░░░░░░░░░░▐▌░░
░░░░░█░░▀░░░░░░░░░░░░░░░░▀░░░
░░░░░░░░░░░░░░░░░░░░░░░░░░░░░`, 'background: white; color: black;');
}

document.addEventListener('DOMContentLoaded', onLoad);
