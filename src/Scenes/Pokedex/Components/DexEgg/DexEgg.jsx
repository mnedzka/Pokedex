import React from 'react';
import {
    PokeTable,
    PokelistItem,
} from 'Components';
import {
    formatName,
} from 'src/utils.js';

export default class DexEgg extends React.Component {
    render () {
        const group = this.props.data;
        const name = formatName(group.name);
        console.log(this);
        return <div>
            <h3>Egg Group: {name}</h3>
            <h5>List of pokemons in {name} egg group.</h5>
            <PokeTable headers="pokelist" data={group.pokemon} listItem={PokelistItem} />
        </div>;
    }
}
