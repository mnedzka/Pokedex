import React from 'react';
import Styles from './PokeLink.scss';
import { connect } from 'react-redux';
import { showInPokedex } from 'Actions';
import { formatName } from 'src/utils';

class PokeLink extends React.Component {
    shouldComponentUpdate (nextProps) {
        if (nextProps.id === this.props.id) {
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

    createInfo = name => {
        if (!this.props.role && this.props.info) {
            return <span className={Styles.infoText}>{' ' + this.props.info}</span>;
        }
        if (this.props.role === 'thumbnail') {
            return <span className={Styles.tooltip}>{name}</span>;
        }
        return null;
    };

    createContent = name => {
        if (this.props.hasOwnProperty('children')) {
            if (this.props.role === 'search') {
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
        const { role = 'wrapper' } = this.props;
        const name = formatName(this.props.name);
        return <div className={Styles[role]}>
            <button onClick={this.handlePokeLinkClick}
                    className={Styles.redirect}>
                {this.createContent(name)}
            </button>
            {this.createInfo(name)}
        </div>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        redirect : data => dispatch(showInPokedex(data)),
    };
};

export default connect(null, mapDispatchToProps)(PokeLink)
