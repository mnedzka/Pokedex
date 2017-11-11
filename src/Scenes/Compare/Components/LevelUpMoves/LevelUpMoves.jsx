import React from 'react';
import Styles from './LevelUpMoves.scss';
import { formatName } from 'src/utils';
import {
    PokeLink,
    DataTable,
    PokeImg,
} from 'Components';

const extractData = data => {
    const tableData = {
        headers : ['Lvl'],
        data : [],
    }
    data.forEach((pokemon, i) => {
        tableData.headers.push(<PokeImg id={pokemon.id} size="icon" />);
        pokemon.moves.level_up.forEach(move => {
            const lvl = move.level_learned_at;
            if (!tableData.data[lvl]) {
                tableData.data[lvl] = Array(data.length + 1).fill('-');
                tableData.data[lvl][0] = lvl;
            }
            const link = <PokeLink key={move.name} id={move.id} name={move.name} type="move" />;
            if (typeof tableData.data[lvl][i + 1] === 'string') {
                tableData.data[lvl][i + 1] = [link];
            } else {
                tableData.data[lvl][i + 1].push(link);
            }
        });
    });
    return tableData;
};

const LevelUpMoves = props => {
    const data = extractData(props.data);
    return <div>
        <h5>Moves learned by level up</h5>
        <div className={Styles.wrapper}>
            <DataTable data={data.data} headers={data.headers} compare />
        </div>
    </div>;
};

export default LevelUpMoves
