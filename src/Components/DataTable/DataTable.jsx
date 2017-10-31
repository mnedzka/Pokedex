import React from 'react';
import Styles from './DataTable.scss';

const DataTable = props => {
    const rows = props.data.map((d, i) => <tr key={i}>
        <td>{d[0] ? d[0] : '-'}</td>
        <td>{d[1] ? d[1] : '-'}</td>
    </tr>);
    return <table className={Styles.main}>
        <tbody>
            {rows}
        </tbody>
    </table>;
};

export default DataTable
