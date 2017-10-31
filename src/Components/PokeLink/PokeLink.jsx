import React from 'react';
import Styles from './PokeLink.scss';
import { connect } from 'react-redux';
import { showInPokedex } from 'Actions';
import {
    formatName,
} from 'src/utils.js';

class PokeLink extends React.Component {
    shouldComponentUpdate (nextProps) {
        if (nextProps === this.props) {
            return false;
        }
        return true;
    }

    handlePokeLinkClick = () => {
        return this.props.redirect({
            type : this.props.type,
            id : this.props.id,
        });
    };

    createInfo = () => {
        if (!this.props.role && this.props.hasOwnProperty('info') && this.props.info) {
            return <span className={Styles.infoText}>{' ' + this.props.info}</span>;
        }
        return null;
    };

    createTooltip = name => {
        if (this.props.role === 'evolution') {
            return <span className={Styles.tooltip}>{name}</span>;
        }
        return null;
    };

    createContent = name => {
        if (this.props.hasOwnProperty('children')) {
            if (this.props.role === 'searchResult') {
                return <span>
                    {this.props.children}
                    <span className={Styles.name}>{name}</span>
                    <span className={Styles.infoText}>{' ' + this.props.info}</span>
                </span>;
            }
            return this.props.children;
        }
        return <span className={Styles.name}>{name}</span>;
    };

    render () {
        const name = formatName(this.props.name);
        const role = this.props.role === 'searchResult' ? 'search' : 'wrapper';
        return <div className={Styles[role]}>
            <button onClick={this.handlePokeLinkClick}
                    className={Styles.redirect}>
                {this.createContent(name)}
            </button>
            {this.createTooltip(name)}
            {this.createInfo()}
        </div>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        redirect : (data) => dispatch(showInPokedex(data)),
    };
};

export default connect(null, mapDispatchToProps)(PokeLink)
