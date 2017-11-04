import React from 'react';
import Styles from './DataTable.scss';

const DataTable = props => {
    const rows = props.data.map((row, i) => <tr key={i}>
        {row.map((cell, i) => <td key={i}>{cell}</td>)}
    </tr>);
    const headers = !props.headers ? null : <thead><tr>
        {props.headers.map((h, i) => <th key={i}>{h}</th>)}
    </tr></thead>;
    const cName = props.compare ? 'compare' : 'default';
    return <table className={Styles[cName]}>
        {headers}
        <tbody>
            {rows}
        </tbody>
    </table>;
};

export default DataTable
