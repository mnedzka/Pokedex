import React from 'react';
import Styles from './PokeType.scss';
import { Link } from 'react-router-dom';
import { formatName } from 'src/utils';

export default class PokeType extends React.Component {
    shouldComponentUpdate (nextProps) {
        if (nextProps === this.props) {
            return false;
        }
        return true;
    }

    render () {
        return this.props.type.map((type, i) => {
            const text = formatName(type.name);
            const path = `/pokedex/type/${type.id}`;
            return <Link key={i} to={path} className={Styles[type.name]}>
                {text}
            </Link>;
        });
    }
}
