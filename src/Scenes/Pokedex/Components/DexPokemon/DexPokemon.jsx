import React from 'react';
import Styles from './DexPokemon.scss';
import { formatName } from 'src/utils';
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

const mapAbilities = abilities => {
    return abilities.sort((a, b) => a.slot - b.slot).map(el => {
        const id = el.id;
        const name = el.name;
        const infoText = el.is_hidden ? '(hidden)' : null;
        return <PokeLink key={name} name={name} id={id}
                info={infoText} type="ability" />
    });
};

const mapEggGroups = egg => {
    return egg.map(el => {
        return <PokeLink key={el.id} name={el.name} id={el.id} type="egg_group" />;
    });
};

const mapHeldItems = heldItemsArr => {
    if (!heldItemsArr.length) return;
    return heldItemsArr.map(item => <PokeLink key={item.id} id={item.id}
        name={item.name} info={`${item.rarity}%`} type="item" />);
};

const getMoveList = (moveArr, method) => {
    if (!moveArr.length) {
        return null;
    }
    return <div className={Styles.section}>
        <h5>Moves learned by {method}</h5>
        <PokeTable headers="movelist" Item={MovelistItem} data={moveArr} />
    </div>;
};

const getGenderRate = rate => {
    if (rate) {
        return `♂ ${(8 - rate) * 12.5}%\n♀ ${rate * 12.5}%`;
    }
    return 'Genderless';
};

const getCaptureRate = (hp, rate) => {
    const catchValueAtMaxHp = (hp * rate / (3 * hp) / 2.55).toFixed(1);
    return `${rate} (${catchValueAtMaxHp}% at max HP)`;
};

const createNavBtns = id => {
    const prev = id < 803 && id - 1 ? id - 1 : 802;
    const next = id + 1 < 803 ? id + 1 : 1;
    return [
        <PokeLink key="prev" name={'← #' + prev} id={prev} type="pokemon" />,
        <PokeLink key="next" name={'#' + next + ' →'} id={next} type="pokemon" />,
    ];
};

const DexPokemon = props => {
    const data = props.data;
    const { hp, speed, special_attack, special_defense, attack, defense } = data.stats;
    const pokedexData = [
        ['Pokedex No', data.id],
        ['Type', <PokeType type={data.types} />],
        ['Height', `${(data.height * 0.1).toFixed(1)} m`],
        ['Weight', `${(data.weight * 0.1).toFixed(1)} kg`],
        ['Ability', mapAbilities(data.abilities)],
        ['Held Item', mapHeldItems(data.held_items)],
    ];
    const breedTrainData = [
        ['Catch rate', getCaptureRate(hp.base, data.capture_rate)],
        ['Base EXP', data.base_experience],
        ['Growth rate', <PokeLink id="experience" name={data.growth_rate} type="wiki" />],
        ['Egg groups', mapEggGroups(data.egg_groups)],
        ['Gender', getGenderRate(data.gender_rate)],
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
    const showcaseStyle = data.types.reduce((acc, t) => acc + t.name, '');
    return <div>
        <div className={Styles.nav}>
            {createNavBtns(data.id)}
            <h3 className={Styles.dexTitle}>Pokemon: {formatName(data.name)}</h3>
        </div>
        <div className={Styles[showcaseStyle]}>
            <PokeImg id={data.id} size="md" />
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
        <PokeStats data={statsData} />
        <DamageRelations type={data.types} />
        {getMoveList(data.moves.level_up, 'level up')}
        {getMoveList(data.moves.egg, 'breeding')}
        {getMoveList(data.moves.machine, 'TM/HM')}
        {getMoveList(data.moves.tutor, 'Tutoring')}
    </div>;
};

export default DexPokemon
