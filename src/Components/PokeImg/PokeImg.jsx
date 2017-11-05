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
        if (id > 649) {
            return './resources/icons/not_ready.svg';
        }
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
        const { id , size = 'sm'} = this.props;
        const url = this.getSrc(id);
        return <img className={Styles[size]} src={url} />;
    }
}
