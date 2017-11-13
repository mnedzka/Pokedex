import {
    PAGE_UPDATE_DEX_DATA,
    LIST_UPDATE_DATA,
    COMPARE_ADD_ITEM,
    COMPARE_REMOVE_ITEM,
    COMPARE_UPDATE_DATA,
} from './actionTypes.js';

// STORE.PAGE
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
    const notification = !notify ? false : {
        name,
        pokeID : id,
        add : true,
        id : `${name}add`,
    };
    return {
        name,
        type : COMPARE_ADD_ITEM,
        payload : id,
        notify : notification,
    };
};

const removeCompare = function removePokemonFromCompare (id, name, notify) {
    const notification = !notify ? false : {
        name,
        pokeID : id,
        add : false,
        id : `${name}remove`,
    };
    return {
        name,
        type : COMPARE_REMOVE_ITEM,
        payload : id,
        notify : notification,
    };
};

const updateCompare = function updateCompareData (data) {
    return {
        type : COMPARE_UPDATE_DATA,
        payload : data,
    };
};

//APP.PAGE
const getPageData = function getValidPageData (state, ownProps) {
    const { pokelist, compare, page } = state;
    const { match : { params : { pageName, subpage, id } } } = ownProps;
    const dexSubpages = [
        'ability',
        'egg_group',
        'item',
        'move',
        'pokemon',
        'type',
        'wiki',
    ];
    const currentPage = pageName ? pageName : 'home';
    let dexItemType = subpage ? subpage : currentPage;
    if (currentPage === 'pokedex' && !dexSubpages.includes(dexItemType)) {
        dexItemType = currentPage;
    }
    const dexItemId = id && !/\D+/.test(id) ? ~~id : id;
    const { dexItemData, dexItemDataType } = page;
    return {
        compare,
        list : pokelist,
        page : {
            currentPage,
            dexItemType,
            dexItemId,
            dexItemData,
            dexItemDataType,
        },
    };
};

export {
    updateDexData,
    updateData,
    addCompare,
    removeCompare,
    updateCompare,
    getPageData,
}

