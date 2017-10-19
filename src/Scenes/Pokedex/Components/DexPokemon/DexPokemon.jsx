import React from 'react';
import Styles from './DexPokemon.scss';
import PokeImg from 'Components/PokeImg/PokeImg.jsx';
import PokeType from 'Components/PokeType/PokeType.jsx';
import PokeLink from 'Components/PokeLink/PokeLink.jsx';
import DamageRelations from 'Components/DamageRelations/DamageRelations.jsx';
import PokeStats from './Components/PokeStats/PokeStats.jsx';
import {
    PokeTable,
    MovelistItem,
} from 'Components/PokeTable/PokeTable.jsx';

const mapAbilities = abilities => {
    return abilities.sort((a, b) => a.slot - b.slot).map(e => {
        const id = e.id;
        const name = e.name;
        const infoText = e.is_hidden ? '(hidden)' : null;
        return <PokeLink key={name}
                name={name} id={id}
                info={infoText} type="ability" />
    });
};

const mapEggGroups = egg => {
    return egg.map(e => {
        return <PokeLink key={e.id} name={e.name} id={e.id} type="egg_group" />;
    });
};

const getStats = stats => {
    let statsObj = {};
    stats.forEach(el => {
        statsObj[el.stat.name] = el.base_stat;
    });
    return statsObj;
};

const createTable = data => {
    return <table className={Styles.statTable}>
        <tbody>
            {data.map(el => {
                return <tr key={el[0]}>
                    <td>{el[0]}</td>
                    <td>{el[1]}</td>
                </tr>;
            })}
        </tbody>
    </table>;
};

const DexPokemon = props => {
    const data = props.data;
    const {hp, speed, special_attack, special_defense, attack, defense} = data.stats;
    const catchValue = (hp.base * data.capture_rate / (3 * hp.base) / 2.55).toFixed(1);

    const pokedexData = [
        ['Pokedex No', data.id],
        ['Type', <PokeType type={data.type} />],
        ['Height', `${(data.height * 0.1).toFixed(1)} m`],
        ['Weight', `${(data.weight * 0.1).toFixed(1)} kg`],
        ['Abilities', mapAbilities(data.abilities)],
    ];
    const genderRatio = `♂ ${(8 - data.gender_rate) * 12.5}%\n♀ ${data.gender_rate * 12.5}%`;
    const breedTrainData = [
        ['Catch rate', `${data.capture_rate} (${catchValue}% at max HP)`],
        ['Base EXP', data.base_experience],
        ['Growth rate', data.growth_rate],
        ['Egg groups', mapEggGroups(data.egg_groups)],
        ['Gender', genderRatio],
        ['Egg cycles', data.hatch_counter],
    ];
    const statsData = [
        hp.base,
        attack.base,
        defense.base,
        special_attack.base,
        special_defense.base,
        speed.base,
    ];
    // Evolution

    return <div>
        <h3>
            Pokemon: {data.name.replace(/\b(\w)/g, m => m.toUpperCase())}
        </h3>
        <div className={Styles.showcase}>
            <PokeImg id={data.id} cl="md" />
            <span className={Styles.flavorText}>
                {data.flavor_text}
            </span>
        </div>
        <div className={Styles.flexwrap}>
            <div className={Styles.dataSection}>
                <h5>Pokedex Data</h5>
                {createTable(pokedexData)}
            </div>
            <div className={Styles.dataSection}>
                <h5>Training &amp; Breeding</h5>
                {createTable(breedTrainData)}
            </div>
        </div>
        <div className={Styles.section}>
            <h5>Base stats</h5>
            <PokeStats data={statsData} />
        </div>
        <div className={Styles.section}>
            <DamageRelations type={data.type} />
        </div>
        <div className={Styles.section}>
            <h5>Moves learnt by lvl</h5>
            <PokeTable headers="movelist" listItem={MovelistItem} data={data.moves.level_up} />
        </div>
        <div className={Styles.section}>
            <h5>Moves learnt by breeding</h5>
            <PokeTable headers="movelist" listItem={MovelistItem} data={data.moves.egg} />
        </div>
        <div className={Styles.section}>
            <h5>Moves learnt by TM</h5>
            <PokeTable headers="movelist" listItem={MovelistItem} data={data.moves.machine} />
        </div>
        <div className={Styles.section}>
            <h5>Moves learnt by Tutor</h5>
            <PokeTable headers="movelist" listItem={MovelistItem} data={data.moves.tutor} />
        </div>
    </div>;
};

export default DexPokemon
