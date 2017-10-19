import React from 'react';
import Styles from './Menu.scss';
import MenuItem from '../MenuItem/MenuItem.jsx';

class Menu extends React.Component {
    shouldComponentUpdate (nextProps) {
        if (nextProps === this.props) {
            return false;
        }
        return true;
    }

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
