import React from 'react';
import { connect } from 'react-redux';
import {
    updateDexData,
    updateData,
} from 'Actions/actions.js';
import PokeCache from 'src/fetch.js';
import Home from 'Scenes/Home/Home.jsx';
import Pokedex from 'Scenes/Pokedex/Pokedex.jsx';
import Pokelist from 'Scenes/Pokelist/Pokelist.jsx';
import Layout from 'Scenes/Layout/Layout.jsx';
import Loader from 'Components/Loader/Loader.jsx';

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
            if (data === null) {
                return;
            }
            console.log('## FETCHED ##');
            console.log(data);
            console.log('## ## ##');
            if (page.currentPage === 'pokelist') {
                this.props.updateList(data);
            } else {
                this.props.updateDex(data);
            }
        });
    };

    isFetchNeeded = () => {
        const type = this.props.page.dexItemType;
        const id = this.props.page.dexItemId;
        const data = this.props.page.dexItemData;
        if (!data) {
            console.warn('No data');
            return true;
        }
        if (data.id !== id) {
            console.warn('Data.id is not equal to props.dexItemId');
            return true;
        }
        if (!data.hasOwnProperty('sprites') && type === 'pokemon') {
            console.warn('Data does not have property sprites, and dexItemType is pokemon');
            return true;
        }
        if (!data.hasOwnProperty('damage_relations') && type === 'type') {
            console.warn('Data does not have property dmg_rel, and dexItemType is type');
            return true;
        }
        if (!data.hasOwnProperty('pp') && type === 'move') {
            console.warn('Data does not have property pp and dexItemType is move');
            return true;
        }
        if (!data.hasOwnProperty('pokemon') && type === 'egg_group') {
            console.log('Data type is egg_group, data does not have pokemons property');
            return true;
        }
        return false;
    };

    render () {
        const {page, list} = this.props;
        let Content = Loader;
        let title = null;
        console.log(this.props);
        if (page.currentPage === 'pokelist') {
            console.log('IT"S A MUTAFUKAN LIST')
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
            const noDataReq = ['pokedex', 'glossary'];
            if (!noDataReq.includes(page.dexItemType) && this.isFetchNeeded()) {
                console.log('FETCH NEEDED');
                this.getData();
            } else {
                Content = Pokedex;
            }
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
        updateDex : data => dispatch(updateDexData(data)),
        updateList : data => dispatch(updateData(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
