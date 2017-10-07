import React from 'react';
import Styles from './PokelistItem.scss';


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

    parseTypes (types) {
        const t = types.map((el, i) => {
            const typeText = `${el.name.substr(0, 1).toUpperCase()}${el.name.substr(1)}`;
            return <span className={Styles[el.name]} key={i}>
                {typeText}
                <br />
            </span>;
        });
        return t;
    }

    render () {
        const pokemon = {...this.props.data};
        return <tr>
            <td>
                <img src={this.getSrc(pokemon.id)} className={Styles.img} />
            </td>
            <td>
                {pokemon.id}
            </td>
            <td>
                {pokemon.name.slice(0, 1).toUpperCase() + pokemon.name.slice(1)}
            </td>
            <td>
                {this.parseTypes(pokemon.types)}
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

export default PokelistItem
