import {
    INC_LIST_LENGTH,
    UPDATE_PENDING,
    SET_LIST_SORTING,
 } from '../Actions/actionTypes.js';

const initialState = {
    length : 0,
    pending : 0,
    sorting : false,
    sortDir : 1,
};

const listReducer = function pokemonListReducer (state = initialState, action) {
    switch (action.type) {
        case INC_LIST_LENGTH:
            const currentLength = state.length;
            const increasedLength = currentLength + action.payload;
            return Object.assign({}, state, {length : increasedLength});
        case UPDATE_PENDING:
            return Object.assign({}, state, {pending : action.payload});
        case SET_LIST_SORTING:
            const sortingDirection = state.sortDir * (-1);
            return Object.assign({}, state, {sorting : action.payload, sortDir : sortingDirection});
        default:
            return state;
    }
};

export default listReducer
