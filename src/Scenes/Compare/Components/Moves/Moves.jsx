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
            headers : ['Move'],
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

    createTables = data => {
        const tables = [];
        for (let i in data) {
            if (i === 'headers' || !data[i].length) continue;
            let learnedBy;
            switch (i) {
                case 'egg':
                    learnedBy = 'breeding';
                    break;
                case 'machine':
                    learnedBy = 'TM';
                    break;
                default:
                    learnedBy = 'Tutor';
            }
            tables.push(<div key={i} className={Styles.section}>
                <h5>Moves learned by {learnedBy}</h5>
                <DataTable headers={data.headers} data={data[i]} compare />
            </div>);
        }
        return tables;
    };

    render () {
        const data = this.extractData(this.props.data);
        return <div className={Styles.about}>
            {this.createTables(data)}
        </div>;
    }
}
