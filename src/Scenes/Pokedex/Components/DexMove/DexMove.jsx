import React from 'react';
import Styles from './DexMove.scss';
import { formatName } from 'src/utils.js';
import {
    DataTable,
    PokeType,
    MoveClass,
    PokeLink,
    PokeTable,
    PokelistItem,
} from 'Components';

const createPokemonList = (pokemon, learnBy, name) => {
    if (!pokemon.length) {
        return null;
    }
    return <div className={Styles.section}>
        <h5>{pokemon.length} Pokemons can learn {name} by {learnBy}</h5>
        <PokeTable headers="pokelist" data={pokemon} Item={PokelistItem} />
    </div>;
};

const createTMLink = machine => {
    if (!machine) return;
    const name = machine.name.toUpperCase();
    return <PokeLink id={machine.id} name={name} type="item" />;
};

const addEffectChance = (descr, chance) => {
    return descr.replace('$effect_chance', chance);
};

const DexMove = props => {
    const move = props.data;
    const { egg, machine, tutor, level_up } = move.pokemon;
    const name = formatName(move.name);
    const moveData = [
        ['Damage Class', <MoveClass data={move.damage_class} />],
        ['Power', move.power],
        ['PP', move.pp],
        ['Accuracy', move.accuracy],
        ['Priority', move.priority],
        ['Effect Chance', move.effect_chance],
        ['TM', createTMLink(move.machine)],
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
            <DataTable data={moveData} />
        </div>
        {createPokemonList(egg, 'breeding', name)}
        {createPokemonList(level_up, 'level up', name)}
        {createPokemonList(machine, 'TM', name)}
        {createPokemonList(tutor, 'tutor', name)}
    </div>;
}

export default DexMove
