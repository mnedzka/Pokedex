import React from 'react';
import Styles from './DexAbility.scss';
import { formatName } from 'src/utils.js';
import {
    PokeTable,
    PokelistItem,
} from 'Components';

export default class DexAbility extends React.Component {
    render () {
        const ability = this.props.data;
        const name = formatName(ability.name);
        return <div>
            <h3>Ability: {name}</h3>
            <div className={Styles.about}>
                <p>
                    <span className={Styles.keyword}>Pokedex: </span>
                    <em>{ability.flavor_text}</em>
                </p>
                <p>
                    <span className={Styles.keyword}>Short description: </span>
                    <em>{ability.effect_entries.short_effect}</em>
                </p>
                <p>
                    <span className={Styles.keyword}>Description: </span>
                    <em>{ability.effect_entries.effect}</em>
                </p>
            </div>
            <div>
                <h5>There is {ability.pokemon.length} Pokemons with {name} ability</h5>
                <PokeTable Item={PokelistItem} data={ability.pokemon} headers="pokelist" />
            </div>
        </div>;
    }
}
