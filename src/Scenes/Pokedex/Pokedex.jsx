import React from 'react';
import { connect } from 'react-redux';
import { updateDexData } from 'Actions';
import {
    DexAbility,
    DexEgg,
    DexWiki,
    DexHome,
    DexItem,
    DexMove,
    DexPokemon,
    DexType,
} from './Components';

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
                return <DexItem data={this.props.data} />
            case 'pokedex':
                return <DexHome />;
            case 'wiki':
                return <DexWiki type={this.props.id} />;
            default:
                return 'SUMTING WONG';
        }
    }
}

const mapStateToProps = state => {
    return {
        type : state.page.dexItemType,
        data : state.page.dexItemData,
        id : state.page.dexItemId,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        update : (data) => dispatch(updateDexData(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pokedex)
