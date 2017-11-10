import React from 'react';
import Styles from './DexHome.scss';
import { connect } from 'react-redux';
import { DexResult } from './Components';
import {
    PokeLink,
    Searchbar,
} from 'Components';

export default class DexHome extends React.Component {
    render () {
        return <div className={Styles.section}>
            <h5>Search</h5>
            <div>Use Pokemon, Move, Ability, Item name or type '#&lt;Number&gt;' to search Pokemon by pokedex number.<br />
            For further info check:
                <ul className={Styles.list}>
                    <li><PokeLink id="pokemon" type="wiki" name="Glossary," /></li>
                    <li><PokeLink id="evolution" type="wiki" name="Evolution," /></li>
                    <li><PokeLink id="experience" type="wiki" name="Experience," /></li>
                    <li><PokeLink id="item" type="wiki" name="Items." /></li>
                </ul>
            </div>
            <Searchbar data={this.props.data} Item={DexResult} absolute={true} />
        </div>;
    }
}
