import React from 'react';
import { connect } from 'react-redux';
import Styles from './DexHome.scss';
import { PokeLink } from 'Components';
import { DexSearchbar } from './Components';

export default class DexHome extends React.Component {
    render () {
        return <div>
            <div className={Styles.section}>
                Pokedex is source of knowledge about pokemon related topics. To see specific information please see a Pokemon page. If you need any explanation see:
                <ul>
                    <li><PokeLink id="pokemon" type="wiki" name="Glossary" /></li>
                    <li><PokeLink id="evolution" type="wiki" name="Evolution" /></li>
                    <li><PokeLink id="experience" type="wiki" name="Experience" /></li>
                    <li><PokeLink id="item" type="wiki" name="Items" /></li>
                </ul>
            </div>
            <div className={Styles.section}>
                <DexSearchbar />
            </div>
        </div>;
    }
}
