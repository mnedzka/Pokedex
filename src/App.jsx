import React from 'react';
import PokeCache from 'src/fetch.js';
import { connect } from 'react-redux';
import { Loader } from 'Components';
import {
    changePage,
    updateDexData,
    updateData,
    updateCompare,
} from 'Actions';
import {
    Compare,
    Home,
    Layout,
    NotFound,
    Pokedex,
    Pokelist,
} from 'Scenes';
import {
    Notification,
} from 'Components';

class App extends React.Component {
    constructor () {
        super();
        this.fetch = new PokeCache();
    }

    getData = (id, type) => {
        const page = this.props.page;
        const body = {
            type : type ? type : page.dexItemType,
            id : id ? id : page.dexItemId,
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
                return this.props.updateList(data);
            }
            if (page.currentPage === 'compare') {
                return this.props.updateCompare(data);
            }
            return this.props.updateDex(data, page.dexItemType);
        });
    };

    getCompData = (pokemons, data) => {
        pokemons.forEach((poke, i) => {
            if (!data[i] || data[i].id !== poke.id) {
                this.getData(poke.id, 'pokemon');
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
        if (dexItemData.hasOwnProperty('id') && dexItemData.id !== dexItemId) {
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
        const {page, list, compare} = this.props;
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
            const noDataReq = ['wiki'];
            if (!noDataReq.includes(page.dexItemType) && this.isFetchNeeded()) {
                console.log('FETCH NEEDED');
                this.getData();
            } else {
                Content = Pokedex;
            }
        }
        if (page.currentPage === 'compare') {
            const comp = this.props.compare;
            if (!comp.pokemon.every(e => comp.pokemon.find(p => p.id === e))) {
                this.getCompData(comp.pokemon, comp.data);
            }
            title = 'Compare';
            Content = Compare;
        }
        if (page.currentPage === '404') {
            title = 'Sorry!';
            Content = NotFound;
        }
        return <Layout title={title}>
            <Content />
            <Notification data={compare.notification} />
        </Layout>;
    }
}

const mapStateToProps = state => {
    return {
        page : state.page,
        list : state.pokelist,
        compare : state.compare,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateDex : (data, type) => dispatch(updateDexData(data, type)),
        updateList : data => dispatch(updateData(data)),
        fetchFail : page => dispatch(changePage(page)),
        updateCompare : data => dispatch(updateCompare(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
