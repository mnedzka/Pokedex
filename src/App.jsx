import React from 'react';
import PokeCache from 'src/fetch.js';
import { connect } from 'react-redux';
import { Loader } from 'Components';
import {
    changePage,
    updateDexData,
    updateData,
} from 'Actions';
import {
    Compare,
    Home,
    Layout,
    NotFound,
    Pokedex,
    Pokelist,
} from 'Scenes';

class App extends React.Component {
    constructor () {
        super();
        this.fetch = new PokeCache();
    }

    getData = () => {
        const page = this.props.page;
        const body = {
            type : page.dexItemType,
            id : page.dexItemId,
        };
        const req = this.fetch.get(body);
        req.then(data => {
            if (!data) {
                if (data === null) {
                    return;
                }
                return this.props.fetchFail('404');
            }
            console.log('## FETCHED ##');
            console.log(data);
            console.log('## ## ##');
            if (page.currentPage === 'pokelist') {
                this.props.updateList(data);
            } else {
                this.props.updateDex(data, page.dexItemType);
            }
        });
    };

    isFetchNeeded = () => {
        const {dexItemType, dexItemId, dexItemData, dexItemDataType, currentPage} = this.props.page;
        if (currentPage === '404') {
            return false;
        }
        if (!dexItemData) {
            console.warn('No data');
            return true;
        }
        if (dexItemData.id !== dexItemId) {
            console.warn('Data.id is not equal to props.dexItemId');
            return true;
        }
        if (dexItemType !== dexItemDataType) {
            console.warn('DexItemType not equal DexItemDataType');
            return true;
        }
        return false;
    };

    render () {
        const {page, list} = this.props;
        let Content = Loader;
        let title = null;
        if (page.currentPage === 'pokelist') {
            title = 'Pokelist';
            if (!list.data) {
                this.getData();
            } else {
                Content = Pokelist;
            }
        }
        if (page.currentPage === 'home') {
            Content = Home;
            title = 'Home';
        }
        if (page.currentPage === 'pokedex') {
            title = 'Pokedex';
            const noDataReq = ['pokedex', 'wiki'];
            if (!noDataReq.includes(page.dexItemType) && this.isFetchNeeded()) {
                console.log('FETCH NEEDED');
                this.getData();
            } else {
                Content = Pokedex;
            }
        }
        if (page.currentPage === '404') {
            title = 'Sorry!';
            Content = NotFound;
        }
        return <Layout title={title}>
            <Content />
        </Layout>;
    }
}

const mapStateToProps = state => {
    return {
        page : state.page,
        list : state.pokelist,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateDex : (data, type) => dispatch(updateDexData(data, type)),
        updateList : data => dispatch(updateData(data)),
        fetchFail : page => dispatch(changePage(page)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
