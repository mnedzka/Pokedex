import React from 'react';
import PokeType from 'Components/PokeType/PokeType.jsx';
import MoveClass from 'Components/MoveClass/MoveClass.jsx';
import {
    PokeTable,
    PokelistItem,
} from 'Components/PokeTable/PokeTable.jsx';

const createTable = dataArr => {
    const rows = dataArr.map((e, i) => {
        return <tr key={i}>
            <td>{e[0]}</td>
            <td>{e[1]}</td>
        </tr>
    });
    return <table>
        <tbody>
            {rows}
        </tbody>
    </table>;
};

const createPokemonList = (pokeArr, learnBy) => {
    if (!pokeArr.length) {
        return null;
    }
    return <div>
        <h5>List of pokemons that can learn this move by {learnBy}.</h5>
        <PokeTable headers="pokelist" data={pokeArr} listItem={PokelistItem} />
    </div>;
};

const DexMove = props => {
    const move = props.data;
    const {egg, machine, tutor, level_up} = move.pokemon;
    const name = move.name.replace(/\b(\w)/g, m => m.toUpperCase());
    const moveData = [
        ['Damage Class', <MoveClass data={move.damage_class} />],
        ['Power', move.power],
        ['PP', move.pp],
        ['Accuracy', move.accuracy],
        ['Priority', move.priority],
        ['Effect Chance', move.effect_chance ? move.effect_chance : '-'],
        ['TM', move.tm ? move.tm.replace(/\D+/g, m => m.toUpperCase()) : '-'],
    ];
    return <div>
        <h3>Move: {name}</h3>
        <p>
            Pokedex: <em>{move.flavor_text}</em>
        </p>
        <p>
            Short description: <em>{move.effect_entries.short_effect}</em>
        </p>
        <p>
            Description: <em>{move.effect_entries.effect}</em>
        </p>
        {createTable(moveData)}
        {createPokemonList(egg, 'breeding')}
        {createPokemonList(level_up, 'level')}
        {createPokemonList(machine, 'TM')}
        {createPokemonList(tutor, 'tutor')}
    </div>;
}

export default DexMove
