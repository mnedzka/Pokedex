import React from 'react';
import Styles from './Pokelist.scss';
import Poke_fetch from '../../fetch.js';
import PokelistTable from './Components/PokelistTable/PokelistTable.jsx';
import Loader from '../../Components/Loader/Loader.jsx';
import { connect } from 'react-redux';
import {
    showMoreOnList,
    updatePokemon,
    updatePending,
} from '../../Actions/actions.js';

const itemsToLoad = 25;

class Pokelist extends React.Component {
    constructor () {
        super();
        this.cache = new Poke_fetch('pokemonList');
    }

    getData = (len = itemsToLoad) => {
        const url = 'https://pokeapi.co/api/v2/pokemon/';
        const pokemonData = this.props.data.slice();

        let pend = len;
        this.props.updatePending(pend);

        for (let i = 1; i <= len; i++) {
            if (pokemonData[i]) {
                pend = pend - 1;
                if (!pend) {
                    this.props.updatePending(pend);
                }
                continue;
            }
            this.cache.get(`${url}${i}/`, i)
            .then(data => {
                pend = pend - 1;

                if (!data.hasOwnProperty('lift')) {
                    pokemonData[i] = this.liftData(data, i);
                } else if (!pokemonData[i]) {
                    pokemonData[i] = data;
                }

                if (!pend) {
                    this.props.updatePending(pend);
                    this.cache.finishBatch(pokemonData);
                    this.props.update(pokemonData);
                }

                return data;
            });
        }
    };

    liftData = (pokemon, pokeId) => {
        const getStat = () => {
            const stat = {};
            for (let [i, el] of pokemon.stats.entries()) {
                stat[el.stat.name] = el.base_stat;
            }
            return stat;
        };
        const getType = () => {
            const types = pokemon.types.slice().sort((a, b) => a.slot > b.slot);
            const lifted = [];
            for (let i = 0; i < types.length; i++) {
                lifted.push({
                    slot : types[i].slot,
                    name : types[i].type.name,
                    url : types[i].type.url,
                });
            }
            return lifted;
        };
        return {
            ...getStat(),
            lift : true,
            id : pokeId,
            name : pokemon.name,
            types : getType(pokemon.types),
        };
    };

    scrollHandler = (ev) => {
        const height = Math.max(
            document.documentElement.scrollHeight,
            document.body.scrollHeight,
        );
        if (height === window.innerHeight + window.scrollY) {
            if (!this.props.pending) {
                this.props.showMore(25);
                this.getData(this.props.length);
            }
        }
    };

    componentDidMount () {
        document.addEventListener('scroll', this.scrollHandler);

        const storedLen = this.cache.getStoredLen();
        if (!storedLen || !this.props.length) {
            this.props.showMore(storedLen);
        }
        this.getData(storedLen);
        return null;
    }

    componentWillUnmount () {
        document.removeEventListener('scroll', this.scrollHandler);
    }

    render () {
        let loader = null;
        let list = null;
        if (this.props.data.length) {
            list = <PokelistTable pokemonData={this.props.data} />;
        }
        if (this.props.pending || !list) {
            loader = <Loader />
        }
        return <div className={Styles.wrapper}>
            {list}
            {loader}
        </div>;
    }
}

const mapStateToProps = state => {
    return {
        length : state.pokemonList.length,
        pending : state.pokemonList.pending,
        data : state.pokemon,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        update : (data) => dispatch(updatePokemon(data)),
        showMore : (number = itemsToLoad) => dispatch(showMoreOnList(number)),
        updatePending : (number) => dispatch(updatePending(number)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pokelist)
