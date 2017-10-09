import { UPDATE_POKEMON_DATA } from 'Actions/actionTypes.js';

const initialState = [];

const pokemonReducer = function pokemonDataReducer (state = initialState, action) {
    switch (action.type) {
        case UPDATE_POKEMON_DATA:
            return action.payload;
        default:
            return state;
    }
};

export default pokemonReducer
