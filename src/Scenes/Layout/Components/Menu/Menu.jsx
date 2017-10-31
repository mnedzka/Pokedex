import React from 'react';
import Styles from './Menu.scss';
import { MenuItem } from '../';

class Menu extends React.Component {
    render () {
        return <div className={Styles.wrapper}>
            <MenuItem text="Home" />
            <MenuItem text="Pokelist" />
            <MenuItem text="Pokedex" />
            <MenuItem text="Compare" disabled />
        </div>;
    }
}

export default Menu
