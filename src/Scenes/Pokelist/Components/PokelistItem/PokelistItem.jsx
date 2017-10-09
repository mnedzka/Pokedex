import React from 'react';
import Styles from './PokelistItem.scss';
import PokeType from 'Components/PokeType/PokeType.jsx';
import { connect } from 'react-redux';
import { showInPokedex } from 'Actions/actions.js';


class PokelistItem extends React.Component {

    getSrc = (id) => {
        const bundleID = ~~(id / 10);
        let pokeID = id.toString();
        if (pokeID.length === 1) {
            pokeID = `00${pokeID}`;
        } else if (pokeID.length === 2) {
            pokeID = `0${pokeID}`;
        }
        return `./resources/pokemon/pokemons_${bundleID}.svg#${pokeID}`;
    };

    handlePokeNameClick = () => {
        return this.props.redirect({
            type : 'pokemon',
            id : this.props.data.id,
        });
    };

    render () {
        const pokemon = {...this.props.data};
        return <tr>
            <td>
                <img src={this.getSrc(pokemon.id)} className={Styles.img} />
            </td>
            <td>
                {pokemon.id}
            </td>
            <td onClick={this.handlePokeNameClick} className={Styles.redirect}>
                {pokemon.name.slice(0, 1).toUpperCase() + pokemon.name.slice(1)}
            </td>
            <td>
                <PokeType types={pokemon.types} />
            </td>
            <td>
                {pokemon.hp}
            </td>
            <td>
                {pokemon.attack}
            </td>
            <td>
                {pokemon.defense}
            </td>
            <td>
                {pokemon['special-attack']}
            </td>
            <td>
                {pokemon['special-defense']}
            </td>
            <td>
                {pokemon.speed}
            </td>
        </tr>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        redirect : (data) => dispatch(showInPokedex(data)),
    };
};

export default connect(null, mapDispatchToProps)(PokelistItem)
