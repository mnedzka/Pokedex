import React from 'react';
import Styles from './DexResult.scss';
import {
    PokeLink,
} from 'Components';

export default class DexResult extends React.Component {
    render () {
        const result = this.props.data;
        const info = result.type === 'pokemon' ? `#${result.id}` : `(${result.type})`;
        return <PokeLink id={result.id} name={result.name} type={result.type} info={info} role="search">
            <img className={Styles.icon} src={`./resources/icons/${result.type}.svg`} />
        </PokeLink>;
    }
}
