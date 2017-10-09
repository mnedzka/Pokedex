import {
    LIST_SET_LENGTH,
    LIST_SET_SORTING,
    LIST_UPDATE_DATA,
 } from 'Actions/actionTypes.js';

const initialState = {
    length : 0,
    pending : false,
    sortBy : 'id',
    sortDir : 1,
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
            return Object.assign({}, state, {
                length : lengthToSet,
                pending : true,
            });
        case LIST_SET_SORTING:
            const reverseDir = state.sortDir * (-1);
            return Object.assign({}, state, {
                sortBy : action.payload,
                sortDir : reverseDir,
            });
        case LIST_UPDATE_DATA:
            return Object.assign({}, state, {
                data : action.payload,
                pending : false,
            });
        default:
            return state;
    }
};

export default listReducer
