import React from 'react';
import Styles from './Home.scss';
import Layout from '../Layout/Layout.jsx';

export default class Home extends React.Component {
    render () {
        return <div>
            <p>Welcome on Pokedex page. This page is using Poke Api (link). And provides information about:</p>
            <ul>
                <li>list of pokemons (up to 6th generation)</li>
                <li>pokemon types, egg groups, pokemon moves</li>
                <li>comparing pokemons</li>
            </ul>
        </div>
    }
}
