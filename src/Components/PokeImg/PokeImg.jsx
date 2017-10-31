import React from 'react';
import Styles from './PokeImg.scss';

export default class PokeImg extends React.Component {
    shouldComponentUpdate (nextProps) {
        if (nextProps === this.props) {
            return false;
        }
        return true;
    }

    getSrc (id) {
        // #TODO
        if (id > 649) {
            return './resources/icons/not_ready.svg';
        }
        // #TODO
        const bundleID = ~~(id / 10);
        let pokeID = id.toString();
        if (pokeID.length === 1) {
            pokeID = `00${pokeID}`;
        } else if (pokeID.length === 2) {
            pokeID = `0${pokeID}`;
        }
        return `./resources/pokemon/pokemons_${bundleID}.svg#${pokeID}`;
    }

    render () {
        const cl = this.props.cl ? this.props.cl : 'sm';
        const url = this.getSrc(this.props.id);
        return <img className={Styles[cl]} src={url} />;
    }
}
