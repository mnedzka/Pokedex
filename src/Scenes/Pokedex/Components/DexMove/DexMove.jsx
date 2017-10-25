import React from 'react';
import PokeType from 'Components/PokeType/PokeType.jsx';
import MoveClass from 'Components/MoveClass/MoveClass.jsx';
import PokeLink from 'Components/PokeLink/PokeLink.jsx';
import Styles from './DexMove.scss';
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

const createPokemonList = (pokeArr, learnBy) => {
    if (!pokeArr.length) {
        return null;
    }
    return <div className={Styles.section}>
        <h5>List of pokemons that can learn this move by {learnBy}.</h5>
        <PokeTable headers="pokelist" data={pokeArr} listItem={PokelistItem} />
    </div>;
};

const createTMLink = machine => {
    const name = machine.name.toUpperCase();
    return <PokeLink id={machine.id} name={name} type="item" />;
};

const DexMove = props => {
    const move = props.data;
    console.log(move);
    const {egg, machine, tutor, level_up} = move.pokemon;
    const name = move.name.replace(/\b(\w)/g, m => m.toUpperCase());
    const moveData = [
        ['Damage Class', <MoveClass data={move.damage_class} />],
        ['Power', move.power],
        ['PP', move.pp],
        ['Accuracy', move.accuracy],
        ['Priority', move.priority],
        ['Effect Chance', move.effect_chance],
        ['TM', move.machine ? createTMLink(move.machine) : '-'],
    ];
    return <div>
        <h3>Move: {name}</h3>
        <div className={Styles.about}>
            <p>
                <span className={Styles.keyword}>Pokedex: </span>
                <em>{move.flavor_text}</em>
            </p>
            <p>
                <span className={Styles.keyword}>Short description: </span>
                <em>{move.effect_entries.short_effect}</em>
            </p>
            <p>
                <span className={Styles.keyword}>Description: </span>
                <em>{move.effect_entries.effect}</em>
            </p>
        </div>
        <div className={Styles.about}>
            <h5>Move stats</h5>
            {createTable(moveData)}
        </div>
        {createPokemonList(egg, 'breeding')}
        {createPokemonList(level_up, 'level')}
        {createPokemonList(machine, 'TM')}
        {createPokemonList(tutor, 'tutor')}
    </div>;
}

export default DexMove
