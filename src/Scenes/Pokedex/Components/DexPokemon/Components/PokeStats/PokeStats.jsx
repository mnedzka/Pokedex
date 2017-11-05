import React from 'react';
import Styles from './PokeStats.scss';

const mapData = statArr => {
    const maxStats = [255, 181, 230, 173, 230, 160];
    const statText = ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed'];
    return statArr.map((e, i) => {
        const max = maxStats[i];
        const width = Math.min(~~((e / max) * 100), 100);
        const rg = [200 - ~~(width * 1.5), 100 + ~~(width * 1.4)];
        const style = {
            width : `${width}%`,
            backgroundColor : `rgb(${rg[0]}, ${rg[1]}, 0)`,
        };
        return <div key={statText[i]} className={Styles.row}>
            {statText[i]}
            <div className={Styles.bar}>
                <div className={Styles.stat} style={style}>
                    {e}
                </div>
            </div>
        </div>;
    });
};

const PokeStats = props => {
    return <div className={Styles.about}>
        <h5>Base stats</h5>
        {mapData(props.data)}
    </div>;
};

export default PokeStats
