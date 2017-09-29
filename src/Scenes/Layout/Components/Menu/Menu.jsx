import React from 'react';
import Styles from './Menu.scss';

class MenuItem extends React.Component {
    render () {
        return <button className={Styles.item} disabled={this.props.disabled}>
            {this.props.text}
        </button>;
    }
}

export default class Menu extends React.Component {
    render () {
        return <div className={Styles.wrapper}>
            <MenuItem text="Home" />
            <MenuItem text="Pokemon List" />
            <MenuItem text="Pokedex" />
            <MenuItem text="Game" disabled />
        </div>;
    }
}
