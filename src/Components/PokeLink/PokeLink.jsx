import React from 'react';
import Styles from './PokeLink.scss';
import { connect } from 'react-redux';
import { showInPokedex } from 'Actions/actions.js';

class PokeLink extends React.Component {
    handlePokeLinkClick = () => {
        return this.props.redirect({
            type : this.props.type,
            id : this.props.id,
        });
    };

    render () {
        const n = this.props.name.replace('-', ' ');
        const name = n.replace(/\b(\w)/g, m => m.toUpperCase());
        const hasInfoText = this.props.hasOwnProperty('info') && this.props.info;
        const infoText = hasInfoText ? this.props.info : null;
        return <span>
            <span
                onClick={this.handlePokeLinkClick}
                className={Styles.redirect}>
                {name + ' '}
                <span className={Styles.infoText}>
                    {infoText}
                </span>
            </span>
        </span>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        redirect : (data) => dispatch(showInPokedex(data)),
    };
};

export default connect(null, mapDispatchToProps)(PokeLink)
