import React from 'react';
import { connect } from 'react-redux';
import { CompareLink } from 'Components';

const CompareResult = props => {
    const { name, id } = props.data;
    const { click, compare } = props;
    const info = `#${id}`;
    return <CompareLink click={click} name={name} id={id}
        info={info} pokemon={compare}>
        <svg role="img" viewBox="0 0 512 512">
            <use xlinkHref="./resources/icons/icons.svg#pokemon" />
        </svg>
    </CompareLink>;
};


const mapStateToProps = state => ({
    compare : state.compare.pokemon,
});

export default connect(mapStateToProps)(CompareResult)
