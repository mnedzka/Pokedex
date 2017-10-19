import React from 'react';
import Styles from './DamageRelations.scss';
import Loader from 'Components/Loader/Loader.jsx';
import PokeType from 'Components/PokeType/PokeType.jsx';
import dmg_rel from './DamageRelations.js';

export default class DamageRelations extends React.Component {
    constructor () {
        super();
        this.table = [
            {
                name : 'normal',
                multi : 1,
                id : 1,
            },
            {
                name  : 'fighting',
                multi : 1,
                id : 2,
            },
            {
                name : 'flying',
                multi : 1,
                id : 3,
            },
            {
                name : 'poison',
                multi : 1,
                id : 4,
            },
            {
                name : 'ground',
                multi : 1,
                id : 5,
            },
            {
                name : 'rock',
                multi : 1,
                id : 6,
            },
            {
                name : 'bug',
                multi : 1,
                id : 7,
            },
            {
                name : 'ghost',
                multi : 1,
                id : 8,
            },
            {
                name : 'steel',
                multi : 1,
                id : 9,
            },
            {
                name : 'fire',
                multi : 1,
                id : 10,
            },
            {
                name : 'water',
                multi : 1,
                id : 11,
            },
            {
                name : 'grass',
                multi : 1,
                id : 12,
            },
            {
                name : 'electric',
                multi : 1,
                id : 13,
            },
            {
                name : 'psychic',
                multi : 1,
                id : 14,
            },
            {
                name : 'ice',
                multi : 1,
                id : 15,
            },
            {
                name : 'dragon',
                multi : 1,
                id : 16,
            },
            {
                name : 'dark',
                multi : 1,
                id : 17,
            },
            {
                name : 'fairy',
                multi : 1,
                id : 18,
            },
        ];
    }

    calcMultipliers = dmgArr => {
        const table = [];
        this.table.forEach(type => table.push({...type}));
        dmgArr.forEach(typeRel => {
            typeRel.forEach(relation => {
                const multiplier = relation[1];
                relation[0].forEach(type => {
                    const index = table.findIndex(e => e.name === type);
                    table[index].multi = table[index].multi * multiplier;
                });
            });
        });
        return table;
    };

    createMultiplierTable = (typeArr, dir) => {
        const table = typeArr.map(typeObj => {
            const type = dmg_rel.find(e => e.name === typeObj.name);
            const noDamage = type.damage_relations[`no_${dir}`].slice();
            const halfDamage = type.damage_relations[`half_${dir}`].slice();
            const doubleDamage = type.damage_relations[`double_${dir}`].slice();
            return [
                [noDamage, 0],
                [halfDamage, 0.5],
                [doubleDamage, 2],
            ];
        });
        return this.calcMultipliers(table);
    };

    parseMultiplierTable = table => {
        const typeMultiMap = table.map((el, i) => {
            const cName = el.multi.toString().replace('.', '');
            return <div key={i} className={Styles.dmgRelItem}>
                <PokeType type={[el]} />
                <span className={Styles[`x${cName}`]}>
                    {el.multi}
                </span>
            </div>;
        });
        return <div className={Styles.dmgRel}>
            {typeMultiMap}
        </div>;
    };

    render () {
        let infoDef = <p>How effective are moves of given types against this pokemon</p>;
        let defense = this.createMultiplierTable(this.props.type, 'from');
        let offense = null;
        if (this.props.hasOwnProperty('offense')) {
            offense = this.createMultiplierTable(this.props.type, 'to');
        }
        return <div className={Styles.wrapper}>
            {offense ? <h5>Offense</h5> : null}
            {offense ? this.parseMultiplierTable(offense) : null}
            <h5>Defense</h5>
            {offense ? null : infoDef}
            {this.parseMultiplierTable(defense)}
        </div>;
    }
}
