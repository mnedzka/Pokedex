import React from 'react';
import Styles from './LevelUpMoves.scss';
import { formatName } from 'src/utils';
import {
    PokeLink,
    DataTable,
} from 'Components';

export default class LevelUpMoves extends React.Component {
    extractData = data => {
        const tableData = {
            headers : ['Lvl'],
            data : [],
        };
        const levels = [];
        data.forEach((pokemon, i) => {
            tableData.headers.push(formatName(pokemon.name));
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

    render () {
        const data = this.extractData(this.props.data);
        return <div>
            <DataTable data={data.data} headers={data.headers} compare={true} />
        </div>;
    }
}
