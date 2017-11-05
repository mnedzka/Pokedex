import {
    COMPARE_ADD_ITEM,
    COMPARE_REMOVE_ITEM,
    COMPARE_UPDATE_DATA,
} from 'Actions/actionTypes';

const initialState = {
    data : [],
    pokemon : [],
    notification : false,
};

const compareReducer = function compareComponentReducer (state = initialState, action) {
    switch (action.type) {
        case COMPARE_ADD_ITEM:
            const pokes = state.pokemon.slice();
            if (pokes.length > 3) pokes.shift();
            pokes.push({
                id : action.payload,
                name : action.name,
            });
            pokes.sort((a, b) => a.id - b.id);
            return {
                ...state,
                pokemon : pokes,
                notification : action.notify,
            };
        case COMPARE_REMOVE_ITEM:
            const filtered = state.pokemon.filter(e => e.id !== action.payload);
            return {
                ...state,
                pokemon : filtered,
                notification : action.notify,
            };
        case COMPARE_UPDATE_DATA:
            const d = [];
            state.pokemon.forEach((poke, i) => {
                const isInState = state.data.find(e => e.id === poke.id);
                if (isInState) {
                    d[i] = isInState;
                } else {
                    d[i] = action.payload;
                }
            });
            return {
                ...state,
                data : d,
            };
        default:
            return state;
    }
};

export default compareReducer
