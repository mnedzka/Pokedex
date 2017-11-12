import React from 'react';
import Styles from './DexHome.scss';
import {
    Pokedex,
    DexResult,
} from './Components';
import {
    PokeLink,
    Searchbar,
} from 'Components';

export default class DexHome extends React.Component {
    render () {
        const { list, data } = this.props;
        return <div>
        <div className={Styles.section}>
            <h5>Search</h5>
            <div className={Styles.marginBottom}>
                Use Pokemon, Move, Ability, Item name or type '#&lt;Number&gt;' to search Pokemon by pokedex number.<br />
                For further info check:
                <ul className={Styles.list}>
                    <li><PokeLink id="pokemon" type="wiki" name="Pokemon," /></li>
                    <li><PokeLink id="move" type="wiki" name="Move," /></li>
                    <li><PokeLink id="evolution" type="wiki" name="Evolution," /></li>
                    <li><PokeLink id="experience" type="wiki" name="Experience," /></li>
                    <li><PokeLink id="item" type="wiki" name="Items." /></li>
                </ul>
            </div>
            <Searchbar data={data} Item={DexResult} absolute={true} />
        </div>
        <Pokedex data={list} />
    </div>
    }
}
