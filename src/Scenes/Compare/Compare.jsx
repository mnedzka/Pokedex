import React from 'react';
import Styles from './Compare.scss';
import { connect } from 'react-redux';
import {
    Searchbar,
    Loader,
} from 'Components';
import {
    Info,
    Moves,
    Charts,
    Showcase,
    LevelUpMoves,
    CompareResult,
} from './Components';

class Compare extends React.Component {
    constructor () {
        super();
        this.state = {
            showCompare : false,
        };
    }

    handleBtnClick = () => {
        this.setState({
            showCompare : !this.state.showCompare,
        });
    };

    handleShowcaseClick = () => {
        if (this.props.pokemon.length == 2) {
            this.setState({
                showCompare : false,
            });
        }
    };

    render () {
        const {pokemon, data, list} = this.props;
        const isFetchDone = pokemon.length ? pokemon.every(p => data.find(e => e.id === p.id)) : true;
        const isReady = pokemon.length > 1 ? pokemon.every(p => data.find(e => e.id === p.id)) : false;
        const btnClass = this.state.showCompare ? 'hide' : 'show';
        const validData = pokemon.map(p => data.find(d => d.id === p.id)).filter(d => d);
        let btn = <Loader />;
        if (isFetchDone) {
            let btnText = this.state.showCompare && pokemon.length > 1 ? 'Hide' : 'Compare';
            btn = <button className={Styles[btnClass]}
                onClick={this.handleBtnClick} disabled={!isReady}>
                {btnText}
            </button>;
        }
        let showcase = null;
        if (pokemon.length) {
            showcase = <div className={Styles.about}>
                <Showcase show={pokemon} data={data} pokemon={list} click={this.handleShowcaseClick} />
            </div>;
        }
        let info = null;
        let charts = null;
        let lvlMoves = null;
        let moves = null;
        if (this.state.showCompare) {
            charts = <div className={Styles.about}>
                <Charts data={validData} />
            </div>;
            info = <div className={Styles.about}>
                <Info data={validData} />
            </div>;
            lvlMoves = <div className={Styles.about}>
                <LevelUpMoves data={validData} />
            </div>;
            moves = <div className={Styles.about}>
                <Moves data={validData} />
            </div>;
        }

        return <div>
            <div className={Styles.about}>
                <Searchbar data={list} item={CompareResult} absolute={true} />
            </div>
            {showcase}
            <div className={Styles.section}>
                {btn}
            </div>
            {info}
            {charts}
            {lvlMoves}
            {moves}
        </div>;
    }
}

const mapStateToProps = state => {
    return {
        pokemon : state.compare.pokemon,
        data : state.compare.data,
        list : state.pokelist.data,
    };
};

export default connect(mapStateToProps)(Compare);
