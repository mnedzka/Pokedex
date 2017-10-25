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
        let name = null;
        if (this.props.hasOwnProperty('name') && this.props.name) {
            const n = this.props.name.replace('-', ' ');
            name = n.replace(/\b(\w)/g, m => m.toUpperCase());

        }
        const hasInfoText = this.props.hasOwnProperty('info') && this.props.info;
        const infoText = hasInfoText ? ` ${this.props.info}` : null;
        return <div>
            <span
                onClick={this.handlePokeLinkClick}
                className={Styles.redirect}>
                {name}
                {this.props.children}
                <span className={Styles.infoText}>
                    {infoText}
                </span>
            </span>
        </div>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        redirect : (data) => dispatch(showInPokedex(data)),
    };
};

export default connect(null, mapDispatchToProps)(PokeLink)
