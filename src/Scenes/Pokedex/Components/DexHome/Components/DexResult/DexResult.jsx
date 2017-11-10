import React from 'react';
import {
    PokeLink,
} from 'Components';

export default class DexResult extends React.Component {
    render () {
        const result = this.props.data;
        const info = result.type === 'pokemon' ? `#${result.id}` : `(${result.type})`;
        return <PokeLink id={result.id} name={result.name} type={result.type} info={info} role="search">
            <svg role="img" viewBox="0 0 512 512">
                <use xlinkHref={`./resources/icons/icons.svg#${result.type}`} />
            </svg>
        </PokeLink>;
    }
}
