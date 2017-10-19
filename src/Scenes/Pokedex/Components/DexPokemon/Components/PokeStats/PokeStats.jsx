import React from 'react';
import Styles from './PokeStats.scss';

const mapData = statArr => {
    const maxStats = [255, 165, 230, 154, 230, 160];
    const statText = ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed'];
    return statArr.map((e, i) => {
        const max = maxStats[i];
        const width = ~~((e / max) * 100);
        const rg = [200 - ~~(width * 1.5), 100 + ~~(width * 1.4)];
        const style = {
            width : `${width}%`,
            backgroundColor : `rgb(${rg[0]}, ${rg[1]}, 0)`,
        };
        return <div key={statText[i]} className={Styles.row}>
            {statText[i]}
            <div className={Styles.bar} style={style}>
                {e}
            </div>
        </div>;
    });
};

const PokeStats = props => {
    return <div>
        {mapData(props.data)}
    </div>;
};

export default PokeStats
