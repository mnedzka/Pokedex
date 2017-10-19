import React from 'react';
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
            <p>
                Pokedex: <em>{ability.flavor_text}</em>
            </p>
            <p>
                Short description: <em>{ability.effect_entries.short_effect}</em>
            </p>
            <p>
                Description: <em>{ability.effect_entries.effect}</em>
            </p>
            <div>
                <h5>Pokemons with {name} ability</h5>
                <PokeTable listItem={PokelistItem} data={ability.pokemon} headers="pokelist" />
            </div>
        </div>;
    }
}
