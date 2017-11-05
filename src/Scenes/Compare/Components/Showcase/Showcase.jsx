import React from 'react';
import Styles from './Showcase.scss';
import {
    PokeImg,
    PokeLink,
    CompareLink,
} from 'Components';

export default class Showcase extends React.Component {
    render () {
        const show = this.props.show.map(p => {
            const isDataReady = this.props.data.find(e => e.id === p.id) ? true : false;
            const pokemon = this.props.pokemon.find(e => e.id === p.id);
            return <div key={p.id}  className={Styles.item}>
                <CompareLink id={p.id} remove={true} ready={isDataReady} name={pokemon.name} click={this.props.click}>
                    <PokeImg size="fill" id={p.id} />
                </CompareLink>
                <PokeLink id={p.id} name={pokemon.name} type="pokemon" />
            </div>}
        );
        return <div className={Styles.wrapper}>
            {show}
        </div>;
    }
}
