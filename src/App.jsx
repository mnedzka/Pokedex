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
                this.props.updateDex(data, page.dexItemType);
            }
        });
    };

    isFetchNeeded = () => {
        const type = this.props.page.dexItemType;
        const id = this.props.page.dexItemId;
        const data = this.props.page.dexItemData;
        const dataType = this.props.page.dexItemDataType;
        const {dexItemType, dexItemId, dexItemData, dexItemDataType} = this.props.page;
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
        updateDex : (data, type) => dispatch(updateDexData(data, type)),
        updateList : data => dispatch(updateData(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App)
