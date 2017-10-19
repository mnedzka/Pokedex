import React from 'react';
import Styles from './PokeImg.scss';

export default class PokeImg extends React.Component {
    getSrc = id => {
        const bundleID = ~~(id / 10);
        let pokeID = id.toString();
        if (pokeID.length === 1) {
            pokeID = `00${pokeID}`;
        } else if (pokeID.length === 2) {
            pokeID = `0${pokeID}`;
        }
        return `./resources/pokemon/pokemons_${bundleID}.svg#${pokeID}`;
    };

    render () {
        const cl = this.props.cl ? this.props.cl : 'img';
        return <img className={Styles[cl]} src={this.getSrc(this.props.id)} />;
    }
}
