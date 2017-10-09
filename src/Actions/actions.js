import {
    PAGE_CHANGE,
    PAGE_SHOW_IN_DEX,
    LIST_SET_LENGTH,
    LIST_SET_SORTING,
    LIST_UPDATE_DATA,
} from './actionTypes.js';

// STORE.PAGE
const changePage = function changeCurrentPage (newPage) {
    return {
        type : PAGE_CHANGE,
        payload : newPage,
    };
};

const showInPokedex = function showInfoInPokedexPage (pokedexPageData) {
    return {
        type : PAGE_SHOW_IN_DEX,
        payload : pokedexPageData,
    };
}

// STORE.POKEMONLIST
const setLength = function setPokemonListLengthTo (newLength) {
    return {
        type : LIST_SET_LENGTH,
        payload : newLength,
    };
};

const setSorting = function setPokemonListSotring (sortBy) {
    return {
        type : LIST_SET_SORTING,
        payload : sortBy,
    };
};

const updateData = function updatePokemonListData (data) {
    return {
        type : LIST_UPDATE_DATA,
        payload : data,
    };
};

export {
    changePage,
    showInPokedex,
    setLength,
    setSorting,
    updateData,
}
