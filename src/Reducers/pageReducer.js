import { CHANGE_PAGE } from '../Actions/actionTypes.js';

const initialState = {
    currentPage : 'home',
};

const pageReducer = function pageChangeReducer (state = initialState, action) {
    switch (action.type) {
        case CHANGE_PAGE:
            return Object.assign({}, state, {currentPage : action.payload});
        default:
            return state;
    }
};

export default pageReducer
