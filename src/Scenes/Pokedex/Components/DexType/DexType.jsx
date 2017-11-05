import React from 'react';
import Styles from './DexType.scss';
import { formatName } from 'src/utils';
import {
    DamageRelations,
    PokeTable,
    PokelistItem,
    MovelistItem,
} from 'Components';

const DexType = props => {
    const { name, damage, pokemon, moves } = props.data;
    return <div>
        <h3>
            Type: {formatName(name)}
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
        <DamageRelations offense type={[props.data]} />
        <div className={Styles.section}>
            <h5>
                There is {pokemon.length} {name} type pokemons
            </h5>
            <PokeTable headers="pokelist" data={pokemon} Item={PokelistItem} />
        </div>
        <div className={Styles.section}>
            <h5>
                There is {moves.length} {name} type moves
            </h5>
            <PokeTable headers="movelist" data={moves} Item={MovelistItem} />
        </div>
    </div>;
}

export default DexType
