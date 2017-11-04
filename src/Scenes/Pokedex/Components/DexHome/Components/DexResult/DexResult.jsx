import React from 'react';
import Styles from './DexResult.scss';
import {
    PokeLink,
} from 'Components';

export default class DexResult extends React.Component {
    render () {
        const res = this.props.data;
        const info = res.type === 'pokemon' ? `#${res.id}` : `(${res.type})`;
        return <PokeLink id={res.id} name={res.name} type={res.type} info={info} role="search">
            <img className={Styles.icon} src={`./resources/icons/${res.type}.svg`} />
        </PokeLink>;
    }
}
