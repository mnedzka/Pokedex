import { combineReducers } from 'redux';
import pageReducer from './pageReducer.js';
import listReducer from './listReducer.js';
import pokemonReducer from './pokemonReducer.js';

const reducer = combineReducers({
    page : pageReducer,
    pokemonList : listReducer,
    pokemon : pokemonReducer,
});

export default reducer
