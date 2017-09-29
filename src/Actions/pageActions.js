import { CHANGE_PAGE } from './actionTypes.js';

const changePage = function (newPage) {
    return {
        type : CHANGE_PAGE,
        page : newPage,
    };
};
