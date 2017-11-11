import React from 'react';
import Styles from './Showcase.scss';
import {
    PokeImg,
    PokeLink,
    CompareLink,
} from 'Components';

const Showcase = props => {
    const show = props.show.map(p => {
        const isDataReady = props.data.find(e => e.id === p.id) ? true : false;
        const pokemon = props.pokemon.find(e => e.id === p.id);
        return <div key={p.id}  className={Styles.item}>
            <CompareLink id={p.id} remove={true} ready={isDataReady} name={pokemon.name} click={props.click}>
                <PokeImg size="fill" id={p.id} />
            </CompareLink>
            <PokeLink id={p.id} name={pokemon.name} type="pokemon" />
        </div>}
    );
    return <div className={Styles.wrapper}>
        {show}
    </div>;
};

export default Showcase
