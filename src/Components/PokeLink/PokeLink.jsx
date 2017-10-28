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
        let content = null;
        let tooltip = null;
        let infoText = null;
        const name = this.props.name.replace('-', ' ').replace(/\b(\w)/g, m => m.toUpperCase());
        if (this.props.hasOwnProperty('children')) {
            content = this.props.children;
            tooltip = <span className={Styles.tooltip}>{name}</span>;
        } else {
            content = name;
        }
        if (this.props.hasOwnProperty('info') && this.props.info) {
            infoText = <span className={Styles.infoText}>
                {' ' + this.props.info}
            </span>
        }
        return <div className={Styles.wrapper}>
            <button onClick={this.handlePokeLinkClick}
                    className={Styles.redirect}>
            {content}
            </button>
            {tooltip}
            {infoText}
        </div>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        redirect : (data) => dispatch(showInPokedex(data)),
    };
};

export default connect(null, mapDispatchToProps)(PokeLink)
