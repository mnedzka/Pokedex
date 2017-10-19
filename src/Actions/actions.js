import {
    PAGE_CHANGE,
    PAGE_SHOW_IN_DEX,
    PAGE_UPDATE_DEX_DATA,
    LIST_SET_LENGTH,
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
};

const updateDexData = function updatePokedexItemData (dexData) {
    return {
        type : PAGE_UPDATE_DEX_DATA,
        payload : dexData,
    };
};

// STORE.POKEMONLIST
const setLength = function setPokemonListLengthTo (newLength) {
    return {
        type : LIST_SET_LENGTH,
        payload : newLength,
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
    updateDexData,
    setLength,
    updateData,
}
