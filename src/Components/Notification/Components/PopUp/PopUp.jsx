import React from 'react';
import Styles from './PopUp.scss';
import { formatName } from 'src/utils';

const PopUp = props => {
    const { data, top } = props;
    const type = data.add ? 'add' : 'remove';
    const message = `Compare: ${data.add ? 'Added' : 'Removed'} ${formatName(data.name)} #${data.pokeID}.`;
    const style = {
        top : `${top * 2}rem`,
    };
    return <div className={Styles[type]} style={style}>
        {message}
    </div>;
};

export default PopUp
