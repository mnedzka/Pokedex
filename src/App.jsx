import React from 'react';
import PokeCache from 'src/fetch.js';
import { connect } from 'react-redux';
import { Loader } from 'Components';
import { Notification } from 'Components';
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

class App extends React.Component {
    constructor () {
        super();
        this.fetch = new PokeCache();
    }

    getData = (id, type) => {
        const { page } = this.props;
        const reqBody = {
            type : type ? type : page.dexItemType,
            id : id ? id : page.dexItemId,
        };
        const reqID = `${reqBody.type}${reqBody.id}`;
        const req = this.fetch.get(reqBody, reqID);
        req.then(data => {
            if (!data) {
                if (data === null) {
                    return;
                }
                return this.props.fetchFail('404');
            }
            __log('Fetched Data', data, 'blue');
            if (reqBody.type === 'pokelist') {
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
            if (!(data[i] && data[i].id === poke.id)) {
                this.getData(poke.id, 'pokemon');
            }
        });
    };

    isFetchNeeded = () => {
        const { dexItemType, dexItemId, dexItemData, dexItemDataType, currentPage } = this.props.page;
        if (currentPage === '404') {
            return false;
        }
        if (!dexItemData || dexItemType !== dexItemDataType) {
            return true;
        }
        if (dexItemData.hasOwnProperty('id') && dexItemData.id !== dexItemId) {
            return true;
        }
        return false;
    };

    createContent = () => {
        const { page, list, compare } = this.props;
        let Content = Loader;
        let title = 'Home';
        switch (page.currentPage) {
            case '404':
                title = 'Sorry!';
                Content = NotFound;
                break;
            case 'pokelist':
                title = 'Pokelist';
                if (!list.data) {
                    this.getData();
                } else {
                    Content = Pokelist;
                }
                break;
            case 'home':
                title = 'Home';
                Content = Home;
                break;
            case 'pokedex':
                title = 'Pokedex';
                const noDataReq = ['wiki'];
                if (!noDataReq.includes(page.dexItemType) && this.isFetchNeeded()) {
                    this.getData();
                } else {
                    Content = Pokedex;
                }
                break;
            case 'compare':
                title = 'Compare';
                const { pokemon, data } = this.props.compare;
                const dataReady = pokemon.every(poke => data.find(d => d.id === poke.id));
                if (!dataReady) {
                    this.getCompData(pokemon, data);
                }
                if (!list.data) {
                    this.getData('compare', 'pokelist');
                } else {
                    Content = Compare;
                }
                break;
        }
        return {
            Content,
            title,
        };
    };

    render () {
        const { page, list, compare } = this.props;
        const current = page.currentPage;
        const { Content, title } = this.createContent();
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
