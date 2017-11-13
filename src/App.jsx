import React from 'react';
import PokeCache from 'src/fetch.js';
import { connect } from 'react-redux';
import { Loader } from 'Components';
import { Notification } from 'Components';
import {
    updateDexData,
    updateData,
    updateCompare,
    getPageData,
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

    fetchFail = () => {
        this.props.history.push('/404');
    };

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
                return this.fetchFail();
            }
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
        const { list, compare, page } = this.props;
        let title = 'Home';
        let content = <Loader />;
        switch (page.currentPage) {
            case '404':
                title = 'Sorry!';
                content = <NotFound />;
                break;
            case 'pokelist':
                title = 'Pokelist';
                if (!list.data) {
                    this.getData();
                } else {
                    content = <Pokelist data={list.data} />;
                }
                break;
            case 'pokedex':
                title = 'Pokedex';
                const noDataReq = ['wiki'];
                if (!noDataReq.includes(page.dexItemType) && this.isFetchNeeded()) {
                    this.getData();
                } else if (!list.data) {
                    this.getData(undefined, 'pokelist');
                } else {
                    content = <Pokedex page={page} data={page.dexItemData} list={list.data} />;
                }
                break;
            case 'compare':
                title = 'Compare';
                const { pokemon, data } = compare;
                const dataReady = pokemon.every(poke => data.find(d => d.id === poke.id));
                if (!dataReady) {
                    this.getCompData(pokemon, data);
                }
                if (!list.data) {
                    this.getData(null, 'pokelist');
                } else {
                    content = <Compare />;
                }
                break;
            default:
                title = 'Home';
                content = <Home />;
        }
        return {
            content,
            title,
        };
    };

    componentDidMount () {
        this.scroll = this.props.history.listen(() => window.scrollTo(0, 0));
    }

    render () {
        const { compare, page } = this.props;
        const { content, title } = this.createContent();
        return <Layout title={title}>
            {content}
            <Notification data={compare.notification} pokemon={compare.pokemon} />
        </Layout>;
    }
}

const mapStateToProps = (state, ownProps) => getPageData(state, ownProps);

const mapDispatchToProps = dispatch => ({
    updateDex : (data, type) => dispatch(updateDexData(data, type)),
    updateList : data => dispatch(updateData(data)),
    updateCompare : data => dispatch(updateCompare(data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(App)
