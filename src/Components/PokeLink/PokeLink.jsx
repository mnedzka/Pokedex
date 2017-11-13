import React from 'react';
import Styles from './PokeLink.scss';
import { Link } from 'react-router-dom';
import { formatName } from 'src/utils';

export default class PokeLink extends React.Component {
    shouldComponentUpdate (nextProps) {
        if (nextProps.id === this.props.id) {
            return false;
        }
        return true;
    }

    createInfo = name => {
        const { role, info } = this.props;
        if (!role && info) {
            return <span className={Styles.infoText}>{' ' + info}</span>;
        }
        if (role === 'thumbnail') {
            return <span className={Styles.tooltip}>{name}</span>;
        }
        return null;
    };

    createContent = name => {
        const { children, role, info } = this.props;
        if (children) {
            if (role === 'search') {
                return <span>
                    {children}
                    <span className={Styles.name}>{name}</span>
                    <span className={Styles.infoText}>{' ' + info}</span>
                </span>;
            }
            return children;
        }
        return <span className={Styles.name}>{name}</span>;
    };

    render () {
        const { role = 'wrapper', disabled, id, name, type } = this.props;
        const displayName = formatName(name);
        const path = `/pokedex/${type}/${id}`;
        const style = disabled ? 'disabled' : 'redirect';
        return <div className={Styles[role]}>
            <Link to={path} className={Styles[style]}>
                {this.createContent(displayName)}
            </Link>
            {this.createInfo(displayName)}
        </div>;
    }
}
