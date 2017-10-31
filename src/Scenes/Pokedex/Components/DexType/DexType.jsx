import React from 'react';
import Styles from './DexType.scss';
import {
    DamageRelations,
    PokeTable,
    PokelistItem,
    MovelistItem,
} from 'Components';

const DexType = props => {
    const {name, damage, pokemon, moves} = props.data;
    return <div>
        <h3>
            Type: {name.slice(0, 1).toUpperCase() + name.slice(1)}
        </h3>
        <div className={Styles.about}>
            <h5>Damage effectiveness.</h5>
            <p>
                Ofense damage effectiveness chart shows how effective is {name} type attack against other types. Number below type is the number that multiplies the damage when types are considered in damage output calculation.
            </p>
            <p>
                Defense damage chart shows how effective are other type attacks against {name} type pokemon. For example: 0.5 stands for 50% of total damage is received and this means attack is not very effective against {name} type pokemon.
            </p>
        </div>
        <div className={Styles.about}>
            <DamageRelations offense type={[props.data]} />
        </div>
        <div className={Styles.section}>
            <h5>
                There are {pokemon.length} {name} type pokemons.
            </h5>
            <PokeTable headers="pokelist" data={pokemon} listItem={PokelistItem} />
        </div>
        <div className={Styles.section}>
            <h5>
                There are {moves.length} {name} type moves.
            </h5>
            <PokeTable headers="movelist" data={moves} listItem={MovelistItem} />
        </div>
    </div>;
}

export default DexType
