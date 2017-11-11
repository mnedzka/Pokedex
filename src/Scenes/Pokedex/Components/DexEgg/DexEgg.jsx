import React from 'react';
import { formatName } from 'src/utils.js';
import {
    PokeTable,
    PokelistItem,
} from 'Components';

const DexEgg = props => {
    const group = props.data;
    const name = formatName(group.name);
    return <div>
        <h3>Egg Group: {name}</h3>
        <h5>There is {group.pokemon.length} Pokemons in {name} egg group.</h5>
        <PokeTable headers="pokelist" data={group.pokemon} Item={PokelistItem} />
    </div>;
};

export default DexEgg
