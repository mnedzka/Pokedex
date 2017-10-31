import React from 'react';
import Styles from './DexMove.scss';
import {
    DataTable,
    PokeType,
    MoveClass,
    PokeLink,
    PokeTable,
    PokelistItem,
} from 'Components';
import {
    formatName,
} from 'src/utils.js';

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

const addEffectChance = (descr, chance) => {
    return descr.replace('$effect_chance', chance);
};

const DexMove = props => {
    const move = props.data;
    console.log(move);
    const {egg, machine, tutor, level_up} = move.pokemon;
    const name = formatName(move.name);
    const moveData = [
        ['Damage Class', <MoveClass data={move.damage_class} />],
        ['Power', move.power],
        ['PP', move.pp],
        ['Accuracy', move.accuracy],
        ['Priority', move.priority],
        ['Effect Chance', move.effect_chance ? move.effect_chance : '-'],
        ['TM', move.machine ? createTMLink(move.machine) : '-'],
    ];
    const effectShort = addEffectChance(move.effect_entries.short_effect, move.effect_chance);
    const effect = addEffectChance(move.effect_entries.effect, move.effect_chance);

    return <div>
        <h3>Move: {name}</h3>
        <div className={Styles.about}>
            <p>
                <span className={Styles.keyword}>Pokedex: </span>
                <em>{move.flavor_text}</em>
            </p>
            <p>
                <span className={Styles.keyword}>Short description: </span>
                <em>{effectShort}</em>
            </p>
            <p>
                <span className={Styles.keyword}>Description: </span>
                <em>{effect}</em>
            </p>
        </div>
        <div className={Styles.about}>
            <h5>Move stats</h5>
            <DataTable data={moveData} />
        </div>
        {createPokemonList(egg, 'breeding')}
        {createPokemonList(level_up, 'level')}
        {createPokemonList(machine, 'TM')}
        {createPokemonList(tutor, 'tutor')}
    </div>;
}

export default DexMove
