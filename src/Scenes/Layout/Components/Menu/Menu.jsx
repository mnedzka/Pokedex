import React from 'react';
import Styles from './Menu.scss';
import MenuItem from '../MenuItem/MenuItem.jsx';

class Menu extends React.Component {
    render () {
        return <div className={Styles.wrapper}>
            <MenuItem text="Home" />
            <MenuItem text="Pokemon List" />
            <MenuItem text="Pokedex" />
            <MenuItem text="Game" disabled />
        </div>;
    }
}

export default Menu
