import React from 'react';
import Styles from './DexItem.scss';
import {
    DataTable,
    PokeLink,
    PokeTable,
    PokelistItem,
} from 'Components';
import {
    formatName,
} from 'src/utils.js';

const createMachineLink = machine => {
    if (!machine) return;
    return <PokeLink id={machine.id} name={machine.name} type="move" />;
};

const createPokemons = (name, pokemon) => {
    if (!pokemon.length) {
        return null;
    }
    return <div className={Styles.section}>
        <h5>{name} can be found on {pokemon.length} Pokemons</h5>
        <PokeTable Item={PokelistItem} data={pokemon} headers="pokelist" />
    </div>;
};

const DexItem = props => {
    const item = props.data;
    const { pokemon, category, cost, fling_effect, fling_power, machine } = item;
    const name = formatName(item.name);
    const itemData = [
        ['Category', <PokeLink id="item" name={category} type="wiki" />],
        ['Cost', cost],
        ['Fling power', fling_power],
        ['Fling effect', fling_effect ? <PokeLink id="item" name={fling_effect} type="wiki" /> : false],
        ['TM', createMachineLink(machine)]
    ];
    return <div>
        <h3>Item: {name}</h3>
        <div className={Styles.about}>
            <p>
                <span className={Styles.keyword}>Pokedex: </span>
                <em>{item.flavor_text}</em>
            </p>
            <p>
                <span className={Styles.keyword}>Short description: </span>
                <em>{item.effect_entries.short_effect}</em>
            </p>
            <p>
                <span className={Styles.keyword}>Description: </span>
                <em>{item.effect_entries.effect}</em>
            </p>
        </div>
        <div className={Styles.about}>
            <DataTable data={itemData} />
        </div>
        {createPokemons(name, pokemon)}
    </div>;
};

export default DexItem
