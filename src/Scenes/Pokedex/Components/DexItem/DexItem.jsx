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

const DexItem = props => {
    console.log(props);
    const item = props.data;
    const {flavor_text, effect_entries, category, cost, fling_effect, fling_power, machine} = item;
    const name = formatName(item.name);
    const itemData = [
        ['Category', <PokeLink id="item" name={category} type="wiki" />],
        ['Cost', cost],
        ['Fling power', fling_power],
        ['Fling effect', fling_effect],
        ['TM', machine ? <PokeLink id={machine.id} name={machine.name} type="move" /> : '-']
    ];

    let held_by = null;
    if (item.pokemon.length) {
        held_by = <div className={Styles.section}>
            <h5>{name} can be found on</h5>
            <PokeTable listItem={PokelistItem} data={item.pokemon} headers="pokelist" />
        </div>;
    }

    return <div>
        <h3>Item: {name}</h3>
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
        <div className={Styles.about}>
            <DataTable data={itemData} />
        </div>
        {held_by}
    </div>;
};

export default DexItem
