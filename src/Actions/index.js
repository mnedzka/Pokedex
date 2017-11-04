import {
    PAGE_CHANGE,
    PAGE_SHOW_IN_DEX,
    PAGE_UPDATE_DEX_DATA,
    PAGE_BACK,
    LIST_UPDATE_DATA,
    COMPARE_ADD_ITEM,
    COMPARE_REMOVE_ITEM,
    COMPARE_UPDATE_DATA,
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

// STORE.COMPARE
const addCompare = function addPokemonToCompare (id, name, notify) {
    const showNotification = notify ? true : false;
    return {
        type : COMPARE_ADD_ITEM,
        payload : id,
        name : name,
        notify : showNotification,
    };
};

const removeCompare = function removePokemonFromCompare (id, name, notify) {
    const showNotification = notify ? true : false;
    return {
        type : COMPARE_REMOVE_ITEM,
        payload : id,
        name : name,
        notify : showNotification,
    };
};

const updateCompare = function updateCompareData (data) {
    return {
        type : COMPARE_UPDATE_DATA,
        payload : data,
    };
};

export {
    changePage,
    showInPokedex,
    updateDexData,
    updateData,
    addCompare,
    removeCompare,
    updateCompare,
}

