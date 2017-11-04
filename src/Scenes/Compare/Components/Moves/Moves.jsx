import React from 'react';
import Styles from './Moves.scss';
import { formatName } from 'src/utils';
import {
    PokeLink,
    DataTable,
} from 'Components';

export default class Moves extends React.Component {
    extractData = data => {
        const tableData = {
            headers : [''],
            egg : [],
            machine : [],
            tutor :  [],
        };
        data.forEach((pokemon, i) => {
            tableData.headers.push(formatName(pokemon.name));
            for (let prop in pokemon.moves) {
                if (prop === 'level_up') continue;
                pokemon.moves[prop].forEach(move => {
                    if (tableData[prop][move.id] === undefined) {
                        tableData[prop][move.id] = Array(data.length + 1).fill('-');
                        tableData[prop][move.id][0] = <PokeLink id={move.id} name={move.name} type="move" />;
                    }
                    tableData[prop][move.id][i + 1] = '✓';
                });
            }
        });
        return tableData;
    };

    render () {
        const data = this.extractData(this.props.data);
        return <div>
            <DataTable headers={data.headers} data={data.egg} compare={true} />
            <DataTable headers={data.headers} data={data.machine} compare={true} />
            <DataTable headers={data.headers} data={data.tutor} compare={true} />
        </div>;
    }
}
