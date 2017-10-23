import React from 'react';
import Styles from './DexAbility.scss';
import {
    PokeTable,
    PokelistItem,
} from 'Components/PokeTable/PokeTable.jsx';

export default class DexAbility extends React.Component {
    render () {
        const ability = this.props.data;
        const name = ability.name.replace(/\b(\w)/g, m => m.toUpperCase());
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
                <h5>Pokemons with {name} ability</h5>
                <PokeTable listItem={PokelistItem} data={ability.pokemon} headers="pokelist" />
            </div>
        </div>;
    }
}
