import {
    PAGE_CHANGE,
    PAGE_SHOW_IN_DEX,
    PAGE_UPDATE_DEX_DATA,
} from 'Actions/actionTypes';

const initialState = {
    currentPage : 'home',
    dexItemType : null,
    dexItemId : null,
    dexItemData : null,
    dexItemDataType : null,
};

const pageReducer = function pageChangeReducer (state = initialState, action) {
    switch (action.type) {
        case PAGE_CHANGE:
            return {
                ...state,
                currentPage : action.payload,
                dexItemType : action.payload,
                dexItemId : null,
            };
        case PAGE_SHOW_IN_DEX:
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
                dexItemDataType : action.dataType,
            };
        default:
            return state;
    }
};

export default pageReducer
