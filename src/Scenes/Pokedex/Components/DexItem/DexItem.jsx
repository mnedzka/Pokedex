import React from 'react';
import Styles from './DexItem.scss';
import PokeLink from 'Components/PokeLink/PokeLink.jsx';
import {
    PokeTable,
    PokelistItem,
} from 'Components/PokeTable/PokeTable.jsx';

const createTable = dataArr => {
    const rows = dataArr.map((e, i) => {
        const val = e[1] ? e[1] : '-';
        return <tr key={i}>
            <td>{e[0]}</td>
            <td>{val}</td>
        </tr>
    });
    return <table className={Styles.statTable}>
        <tbody>
            {rows}
        </tbody>
    </table>;
};

const DexItem = props => {
    console.log(props);
    const item = props.data;
    const {flavor_text, effect_entries, category, cost, fling_effect, fling_power, machine} = item;
    const name = item.name.replace('-', ' ').replace(/\b(\w)/g, m => m.toUpperCase());
    const table = [
        ['Category', <PokeLink name={category} type="glossary" />],
        ['Cost', cost],
        ['Fling power', fling_power ? fling_power : '-'],
        ['Fling effect', fling_effect ? fling_effect : '-'],
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
            {createTable(table)}
        </div>
        {held_by}
    </div>;
};

export default DexItem
