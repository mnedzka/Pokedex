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
        const { type, data, id } = this.props;
        switch (type) {
            case 'type':
                return <DexType data={data} />;
            case 'pokemon':
                return <DexPokemon data={data} />;
            case 'move':
                return <DexMove data={data} />;
            case 'ability':
                return <DexAbility data={data} />;
            case 'egg_group':
                return <DexEgg data={data} />;
            case 'item':
                return <DexItem data={data} />
            case 'pokedex':
                return <DexHome data={data} />;
            case 'wiki':
                return <DexWiki type={id} />;
            default:
                return `Error => requested page type (${type}) not found`;
        }
    }
}

const mapStateToProps = state => ({
    type : state.page.dexItemType,
    data : state.page.dexItemData,
    id : state.page.dexItemId,
});

const mapDispatchToProps = dispatch => ({
    update : (data) => dispatch(updateDexData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pokedex)
