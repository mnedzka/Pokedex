import {
    COMPARE_ADD_ITEM,
    COMPARE_REMOVE_ITEM,
    COMPARE_UPDATE_DATA,
} from 'Actions/actionTypes';

const initialState = {
    data : [],
    pokemon : [],
    notification : null,
};

const compareReducer = function compareComponentReducer (state = initialState, action) {
    switch (action.type) {
        case COMPARE_ADD_ITEM:
            const pokes = state.pokemon.slice();
            const newPoke = {
                id : action.payload,
                name : action.name,
            };
            if (pokes.length > 3) pokes.shift();
            pokes.push(newPoke);
            pokes.sort((a, b) => a.id - b.id);
            const addNotify = !action.notify ? state.notification : {
                pokeID : action.payload,
                name : action.name,
                add : true,
                id : `${action.payload}${action.name}1`,
            };
            return {
                ...state,
                pokemon : pokes,
                notification : addNotify,
            };
        case COMPARE_REMOVE_ITEM:
            const filtered = state.pokemon.filter(e => e.id !== action.payload);
            const removeNotify = !action.notify ? state.notification : {
                pokeID : action.payload,
                name : action.name,
                add : false,
                id : `${action.payload}${action.name}0`,
            };
            return {
                ...state,
                pokemon : filtered,
                notification : removeNotify,
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
