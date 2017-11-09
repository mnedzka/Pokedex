import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { updateData } from 'Actions';
import { log } from 'src/utils';
import Store from './store';
import PokeCache from './fetch';

//
//
window.__log = (text = '', data = '', bg = 'darkblue', col = 'white') => {
    console.log(`%c ${text} \n`, `background: ${bg}; color: ${col};`, data);
};
//
//

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
    new PokeCache().get(undefined, 'pokelistnull').then(d => Store.dispatch(updateData(d)));
    ReactDOM.render(
        <Provider store={Store}>
            <App />
        </Provider>,
        document.querySelector('#app')
    );
    __log(`░░░░░░░░░░░░░░░░░░░░░░░░░░░░
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
░░░░░░░░░░░░░░░░░░░░░░░░░░░░`, undefined, 'white', 'black');
}

document.addEventListener('DOMContentLoaded', onLoad);
