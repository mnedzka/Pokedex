import React from 'react';
import Styles from './DexPokemon.scss';
import {
    PokeImg,
    PokeType,
    PokeLink,
    DamageRelations,
    DataTable,
    PokeTable,
    MovelistItem,
} from 'Components';
import {
    PokeStats,
    PokeEvo,
    PokeForm,
} from './Components';
import {
    formatName,
} from 'src/utils.js';

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

const mapHeldItems = heldItemsArr => {
    if (!heldItemsArr.length) {
        return '-';
    }
    return heldItemsArr.map(item => <PokeLink key={item.id} id={item.id} name={item.name}
        info={`${item.rarity}%`} type="item" />);
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
        ['Growth rate', <PokeLink id="experience" name={data.growth_rate} type="wiki" />],
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
    const prevId = data.id - 1 ? data.id - 1 : 802;
    const nextId = data.id + 1 < 803 ? data.id + 1 : 1;
    const navBtns = [
        <PokeLink key="prev" name={'← #' + prevId} id={prevId} type="pokemon" />,
        <PokeLink key="next" name={'#' + nextId + ' →'} id={nextId} type="pokemon" />,
    ];
    return <div>
        <div className={Styles.nav}>
            {navBtns}
            <h3 className={Styles.dexTitle}>Pokemon: {formatName(data.name)}</h3>
        </div>
        <div className={Styles.showcase}>
            <PokeImg id={data.id} cl="md" />
            <span className={Styles.flavorText}>
                {data.flavor_text}
            </span>
        </div>
        <PokeForm data={data.forms} id={data.id} />
        <PokeEvo data={data.evolution_chain} id={data.id} />
        <div className={Styles.info}>
            <div className={Styles.dataSection}>
                <h5>Pokedex Data</h5>
                <DataTable data={pokedexData} />
            </div>
            <div className={Styles.dataSection}>
                <h5>Training &amp; Breeding</h5>
                <DataTable data={breedTrainData} />
            </div>
        </div>
        <div className={Styles.about}>
            <h5>Base stats</h5>
            <PokeStats data={statsData} />
        </div>
        {<div className={Styles.about}>
            <DamageRelations type={data.types} />
        </div>}
        {getMoveList(data.moves.level_up, 'level up')}
        {getMoveList(data.moves.egg, 'breeding')}
        {getMoveList(data.moves.machine, 'TM')}
        {getMoveList(data.moves.tutor, 'tutor')}
    </div>;
};

export default DexPokemon
