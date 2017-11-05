import React from 'react';
import Styles from './CompareResult.scss';
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
            <img className={Styles.icon} src="./resources/icons/pokemon.svg" />
        </CompareLink>;
    }
}

const mapStateToProps = state => {
    return {
        compare : state.compare.pokemon,
    };
};

export default connect(mapStateToProps)(CompareResult)
