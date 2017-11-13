import React from 'react';
import { NotFound } from 'Scenes';
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

export default class Pokedex extends React.Component {
    render () {
        const { dexItemType, dexItemId } = this.props.page;
        const { data, list } = this.props;
        switch (dexItemType) {
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
            case 'wiki':
                return <DexWiki type={dexItemId} />;
            case 'pokedex':
                return <DexHome data={data} list={list} />;
            default:
                return <NotFound />;
        }
    }
}
