import React from 'react';
import Styles from './PokeForm.scss';
import {
    PokeLink,
    PokeImg,
} from 'Components';

const mapPokeForms = (data, id) => {
    return data.filter(f => f.id !== id).map(f => {
        return <div key={f.id} className={Styles.item}>
            <PokeLink name={f.name} id={f.id} type="pokemon" role="thumbnail">
                <PokeImg id={f.id} />
            </PokeLink>
        </div>;
    });
};

const PokeForm = props => {
    const { id, data } = props;
    if (data.length < 2) {
        return null;
    }
    return <div className={Styles.wrapper}>
        <h5>Other forms of this Pokemon</h5>
        {mapPokeForms(data, id)}
    </div>;
};

export default PokeForm
