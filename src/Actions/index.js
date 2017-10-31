import {
    PAGE_CHANGE,
    PAGE_SHOW_IN_DEX,
    PAGE_UPDATE_DEX_DATA,
    PAGE_BACK,
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

const updateDexData = function updatePokedexItemData (dexData, type) {
    return {
        type : PAGE_UPDATE_DEX_DATA,
        payload : dexData,
        dataType : type,
    };
};

// STORE.POKEMONLIST
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
    updateData,
}
