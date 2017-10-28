import React from 'react';
import { connect } from 'react-redux';
import Styles from './DexHome.scss';
import PokeLink from 'Components/PokeLink/PokeLink.jsx';
import DexSearchbar from './Components/DexSearchbar/DexSearchbar.jsx';

export default class DexHome extends React.Component {
    render () {
        return <div>
            <div className={Styles.section}>
                Pokedex is source of knowledge about pokemon related topics. To see specific information please see a Pokemon page. If you need any explanation see: <span style={{display: 'inline-block'}}>
                    <PokeLink id={0} type="glossary" name="Glossary" />
                </span>
            </div>
            <DexSearchbar />
        </div>;
    }
}
