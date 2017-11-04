import React from 'react';
import Styles from './PopUp.scss';
import { formatName } from 'src/utils';

export default class PopUp extends React.Component {
    render () {
        const { data, top } = this.props;
        const inlineStyle = {
            top : `${top * 2}rem`,
        };
        const type = data.add ? 'add' : 'remove';
        const message = `Compare: ${data.add ? 'Added' : 'Removed'} ${formatName(data.name)} #${data.pokeID}.`;
        return <div className={Styles[type]} style={inlineStyle}>
            {message}
        </div>;
    }
}
