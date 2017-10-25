import React from 'react';
import { connect } from 'react-redux';
import { updateDexData } from 'Actions/actions.js';
import DexType from './Components/DexType/DexType.jsx';
import DexHome from './Components/DexHome/DexHome.jsx';
import DexPokemon from './Components/DexPokemon/DexPokemon.jsx';
import DexAbility from './Components/DexAbility/DexAbility.jsx';
import DexMove from './Components/DexMove/DexMove.jsx';
import DexEgg from './Components/DexEgg/DexEgg.jsx';
import DexGlossary from './Components/DexGlossary/DexGlossary.jsx';
import DexItem from './Components/DexItem/DexItem.jsx';

class Pokedex extends React.Component {
    render () {
        switch (this.props.type) {
            case 'type':
                return <DexType data={this.props.data} />;
            case 'pokemon':
                return <DexPokemon data={this.props.data} />;
            case 'move':
                return <DexMove data={this.props.data} />;
            case 'ability':
                return <DexAbility data={this.props.data} />;
            case 'egg_group':
                return <DexEgg data={this.props.data} />;
            case 'item':
                return <DexItem daa={this.props.data} />
            case 'pokedex':
                return <DexHome />;
            case 'glossary':
                return <DexGlossary />;
            default:
                return 'SUMTING WONG';
        }
    }
}

const mapStateToProps = state => {
    return {
        type : state.page.dexItemType,
        data : state.page.dexItemData,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        update : (data) => dispatch(updateDexData(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pokedex)
