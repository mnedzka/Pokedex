import React from 'react';
import Styles from './DataTable.scss';

const DataTable = props => {
    const rows = props.data.map((row, i) => <tr key={i}>
        {row.map((cell, i) => <td key={i}>{cell ? cell : '-'}</td>)}
    </tr>);
    const headers = !props.headers ? null : <tr>
        {props.headers.map((h, i) => <th key={i}>{h}</th>)}
    </tr>;
    const role = props.compare ? 'compare' : 'default';
    return <table className={Styles[role]}>
        <thead>
            {headers}
        </thead>
        <tbody>
            {rows}
        </tbody>
    </table>;
};

export default DataTable
