import {
    CHANGE_PAGE,
    INC_LIST_LENGTH,
    UPDATE_POKEMON_DATA,
    UPDATE_PENDING,
    SET_LIST_SORTING,
} from './actionTypes.js';

// STORE.PAGE
const changePage = function changeCurrentPage (newPage) {
    return {
        type : CHANGE_PAGE,
        payload : newPage,
    };
};

// STORE.POKEMONLIST
const showMoreOnList = function increasePokemonListLength (valueToAdd) {
    return {
        type : INC_LIST_LENGTH,
        payload : valueToAdd,
    };
};

const updatePending = function updatePendingRequests (value) {
    return {
        type : UPDATE_PENDING,
        payload : value,
    };
};

const setSorting = function setPokemonListSotring (sortBy) {
    return {
        type : SET_LIST_SORTING,
        payload : sortBy,
    };
};

// STORE.POKEMON
const updatePokemon = function updatePokemonData (data) {
    return {
        type : UPDATE_POKEMON_DATA,
        payload : data,
    };
};

export {
    changePage,
    showMoreOnList,
    updatePokemon,
    updatePending,
    setSorting,
}
