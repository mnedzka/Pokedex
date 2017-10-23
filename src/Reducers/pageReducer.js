import {
    PAGE_CHANGE,
    PAGE_SHOW_IN_DEX,
    PAGE_UPDATE_DEX_DATA,
} from 'Actions/actionTypes.js';

const initialState = {
    currentPage : 'home',
    dexItemType : null,
    dexItemId : null,
    dexItemData : null,
};

const pageReducer = function pageChangeReducer (state = initialState, action) {
    switch (action.type) {
        case PAGE_CHANGE:
            window.__fetchlist.ab();
            window.scrollTo(0, 0);
            return {
                ...state,
                currentPage : action.payload,
                dexItemType : action.payload,
            };
        case PAGE_SHOW_IN_DEX:
            window.__fetchlist.ab();
            window.scrollTo(0, 0);
            return {
                ...state,
                currentPage : 'pokedex',
                dexItemType : action.payload.type,
                dexItemId : action.payload.id,
            };
        case PAGE_UPDATE_DEX_DATA:
            return {
                ...state,
                dexItemData : action.payload,
            };
        default:
            return state;
    }
};

export default pageReducer
