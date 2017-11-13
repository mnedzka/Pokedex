import React from 'react';
import Styles from './MenuItem.scss';
import { NavLink } from 'react-router-dom';

export default class MenuItem extends React.Component {
    shouldComponentUpdate (nextProps) {
        if (nextProps === this.props) {
            return false;
        }
        return true;
    }

    render () {
        const { text } = this.props;
        const path = text === 'Home' ? '/' : `/${text.toLowerCase()}`;
        return <NavLink to={path} className={Styles.item}>
            {text}
        </NavLink>
    }
}
