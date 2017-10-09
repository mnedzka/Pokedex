import {
    PAGE_CHANGE,
    PAGE_SHOW_IN_DEX,
} from 'Actions/actionTypes.js';

const initialState = {
    currentPage : 'home',
    dexItemType : null,
    dexId : null,
};

const pageReducer = function pageChangeReducer (state = initialState, action) {
    switch (action.type) {
        case PAGE_CHANGE:
            return Object.assign({}, state, {currentPage : action.payload});
        case PAGE_SHOW_IN_DEX:
            return Object.assign({}, state, {
                currentPage : 'pokedex',
                dexItemType : action.payload.type,
                dexId : action.payload.id,
            });
        default:
            return state;
    }
};

export default pageReducer
