import React from 'react';
import Styles from './DexAbility.scss';
import { formatName } from 'src/utils.js';
import {
    PokeTable,
    PokelistItem,
} from 'Components';

const Ability = props => {
    const ability = props.data;
    const { flavor_text, effect_entries, pokemon } = ability;
    const name = formatName(ability.name);
    return <div>
        <h3>Ability: {name}</h3>
        <div className={Styles.about}>
            <p>
                <span className={Styles.keyword}>Pokedex: </span>
                <em>{flavor_text}</em>
            </p>
            <p>
                <span className={Styles.keyword}>Short description: </span>
                <em>{effect_entries.short_effect}</em>
            </p>
            <p>
                <span className={Styles.keyword}>Description: </span>
                <em>{effect_entries.effect}</em>
            </p>
        </div>
        <div>
            <h5>There is {pokemon.length} Pokemons with {name} ability</h5>
            <PokeTable Item={PokelistItem} data={pokemon} headers="pokelist" />
        </div>
    </div>;
};

export default Ability
