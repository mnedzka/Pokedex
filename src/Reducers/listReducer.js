import {
    LIST_UPDATE_DATA,
 } from 'Actions/actionTypes.js';

const initialState = {
    data : null,
};

const listReducer = function pokemonListReducer (state = initialState, action) {
    switch (action.type) {
        case LIST_UPDATE_DATA:
            return {
                ...state,
                data : Object.values(action.payload),
            };
        default:
            return state;
    }
};

export default listReducer
