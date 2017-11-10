import React from 'react';
import { connect } from 'react-redux';
import {
    CompareLink,
} from 'Components';

class CompareResult extends React.Component {
    render () {
        const { name, id } = this.props.data;
        const info = `#${id}`;
        return <CompareLink click={this.props.click}
                name={name} id={id} info={info} pokemon={this.props.compare}>
            <svg role="img" viewBox="0 0 512 512">
                <use xlinkHref="./resources/icons/icons.svg#pokemon" />
            </svg>
        </CompareLink>;
    }
}

const mapStateToProps = state => {
    return {
        compare : state.compare.pokemon,
    };
};

export default connect(mapStateToProps)(CompareResult)
