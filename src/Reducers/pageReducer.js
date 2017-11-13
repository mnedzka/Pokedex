import { PAGE_UPDATE_DEX_DATA } from 'Actions/actionTypes';

const initialState = {
    dexItemData : undefined,
    dexItemDataType : undefined,
};

const pageReducer = function pageChangeReducer (state = initialState, action) {
    switch (action.type) {
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
