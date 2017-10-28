import React from 'react';
import Styles from './DexPokemon.scss';
import PokeImg from 'Components/PokeImg/PokeImg.jsx';
import PokeType from 'Components/PokeType/PokeType.jsx';
import PokeLink from 'Components/PokeLink/PokeLink.jsx';
import DamageRelations from 'Components/DamageRelations/DamageRelations.jsx';
import PokeStats from './Components/PokeStats/PokeStats.jsx';
import PokeEvo from './Components/PokeEvo/PokeEvo.jsx';
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

const mapHeldItems = heldItemsArr => {
    if (!heldItemsArr.length) {
        return '-';
    }
    return heldItemsArr.map(item => {
        return <PokeLink key={item.id}
                    id={item.id}
                    name={item.name}
                    info={`${item.rarity}%`}
                    type="item" />
    });
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

const getMoveList = (moveArr, method) => {
    if (!moveArr.length) {
        return null;
    }
    return <div className={Styles.section}>
        <h5>Moves learned by {method}</h5>
        <PokeTable headers="movelist" listItem={MovelistItem} data={moveArr} />
    </div>;
};

const mapPokemonForms = (forms, id) => {
    if (forms.length < 2) {
        return null;
    }
    const otherForms = forms.filter(f => f.id !== id).map(f => {
        return <PokeLink key={f.id} name={f.name} id={f.id} type="pokemon">
            <PokeImg id={f.id} />
        </PokeLink>;
    });
    return <div className={Styles.forms}>
        <h5>Other forms</h5>
        {otherForms}
    </div>;
};

const DexPokemon = props => {
    const data = props.data;
    const {hp, speed, special_attack, special_defense, attack, defense} = data.stats;
    const catchValue = (hp.base * data.capture_rate / (3 * hp.base) / 2.55).toFixed(1);

    const pokedexData = [
        ['Pokedex No', data.id],
        ['Type', <PokeType type={data.types} />],
        ['Height', `${(data.height * 0.1).toFixed(1)} m`],
        ['Weight', `${(data.weight * 0.1).toFixed(1)} kg`],
        ['Abilities', mapAbilities(data.abilities)],
        ['Held Items', mapHeldItems(data.held_items)],
    ];
    let genderRate = 'Genderless';
    if (data.gender_rate > 0) {
        genderRate = `♂ ${(8 - data.gender_rate) * 12.5}%\n♀ ${data.gender_rate * 12.5}%`
    }
    const breedTrainData = [
        ['Catch rate', `${data.capture_rate} (${catchValue}% at max HP)`],
        ['Base EXP', data.base_experience],
        ['Growth rate', data.growth_rate],
        ['Egg groups', mapEggGroups(data.egg_groups)],
        ['Gender', genderRate],
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
        {mapPokemonForms(data.forms, data.id)}
        <PokeEvo data={data.evolution_chain} id={data.id} />
        <div className={Styles.info}>
            <div className={Styles.dataSection}>
                <h5>Pokedex Data</h5>
                {createTable(pokedexData)}
            </div>
            <div className={Styles.dataSection}>
                <h5>Training &amp; Breeding</h5>
                {createTable(breedTrainData)}
            </div>
        </div>
        <div className={Styles.about}>
            <h5>Base stats</h5>
            <PokeStats data={statsData} />
        </div>
        <div className={Styles.about}>
            <DamageRelations type={data.types} />
        </div>
        {getMoveList(data.moves.level_up, 'level up')}
        {getMoveList(data.moves.egg, 'breeding')}
        {getMoveList(data.moves.machine, 'TM')}
        {getMoveList(data.moves.tutor, 'tutor')}
    </div>;
};

export default DexPokemon
