import React from 'react';
import Styles from './Pokelist.scss';
import Poke_fetch from 'src/fetch.js';
import Loader from 'Components/Loader/Loader.jsx';
import PokelistTable from './Components/PokelistTable/PokelistTable.jsx';
import { connect } from 'react-redux';
import {
    setLength,
    updateData,
} from 'Actions/actions.js';

const loadMoreBy = 100;

class Pokelist extends React.Component {
    constructor () {
        super();
        this.cache = new Poke_fetch('pokemonList');
    }

    getData = () => {
        const url = './resources/data/pokemonList.json';
        const pokemonData = this.props.data.slice();
        const len = this.props.length;
        this.cache.get(url)
        .then(data => {
            for (let i = 1; i <= len; i++) {
                if (!pokemonData[i]) {
                    pokemonData[i] = data[i];
                }
            }
            this.cache.setStorage({[url] : data});
            this.props.update(pokemonData);
        });
    };

    handleScroll = ev => {
        const height = Math.max(
            document.documentElement.scrollHeight,
            document.body.scrollHeight,
        );
        if (height === window.innerHeight + window.scrollY) {
            if (!this.props.pending && this.props.length < 721) {
                this.props.setLen(this.props.length + loadMoreBy);
            }
        }
    };

    componentDidMount () {
        document.addEventListener('scroll', this.handleScroll);
        if (!this.props.length) {
            this.props.setLen();
        }
    }

    componentWillUnmount () {
        document.removeEventListener('scroll', this.handleScroll);
    }

    render () {
        if (this.props.pending) {
            this.getData();
        }
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
        data : state.pokemonList.data,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        update : (data) => dispatch(updateData(data)),
        setLen : (number = loadMoreBy) => dispatch(setLength(number)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pokelist)
