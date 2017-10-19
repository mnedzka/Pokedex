import {
    LIST_SET_LENGTH,
    LIST_UPDATE_DATA,
 } from 'Actions/actionTypes.js';

const initialState = {
    length : 100,
    data : [],
};

const listReducer = function pokemonListReducer (state = initialState, action) {
    switch (action.type) {
        case LIST_SET_LENGTH:
            if (state.length === 721) {
                console.log('LENGTH REACHED MAX VALUE ', state);
                return state;
            }
            let lengthToSet = action.payload > 721 ? 721 : action.payload;
            return {
                ...state,
                length : lengthToSet,
            };
        case LIST_UPDATE_DATA:
            return {
                ...state,
                data : action.payload,
            };
        default:
            return state;
    }
};

export default listReducer
