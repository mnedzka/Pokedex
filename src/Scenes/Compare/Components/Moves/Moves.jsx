import React from 'react';
import Styles from './Moves.scss';
import { formatName } from 'src/utils';
import {
    PokeLink,
    DataTable,
    PokeImg,
} from 'Components';

const extractData = data => {
    const tableData = {
        headers : ['Move'],
        egg : [],
        machine : [],
        tutor :  [],
    };
    data.forEach((pokemon, i) => {
        tableData.headers.push(<PokeImg id={pokemon.id} size="icon" />);
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

const createTables = data => {
    const tables = [];
    for (let i in data) {
        if (i === 'headers' || !data[i].length) continue;
        let learnedBy;
        switch (i) {
            case 'egg':
                learnedBy = 'breeding';
                break;
            case 'machine':
                learnedBy = 'Machine';
                break;
            default:
                learnedBy = 'Tutor';
        }
        tables.push(<div key={i}>
            <h5>Moves learned by {learnedBy}</h5>
            <div className={Styles.wrapper}>
                <DataTable headers={data.headers} data={data[i]} compare />
            </div>
        </div>);
    }
    return tables;
};

const Moves = props => {
    const data = extractData(props.data);
    return <div>
        {createTables(data)}
    </div>;
};

export default Moves
