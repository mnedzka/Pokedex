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
        const { redirect, type, id } = this.props;
        return redirect({
            id,
            type,
        });
    };

    createInfo = name => {
        const { role, info } = this.props;
        if (!role && info) {
            return <span className={Styles.infoText}>{' ' + info}</span>;
        }
        if (role === 'thumbnail') {
            return <span className={Styles.tooltip}>{name}</span>;
        }
        return null;
    };

    createContent = name => {
        const { children, role, info } = this.props;
        if (children) {
            if (role === 'search') {
                return <span>
                    {children}
                    <span className={Styles.name}>{name}</span>
                    <span className={Styles.infoText}>{' ' + info}</span>
                </span>;
            }
            return children;
        }
        return <span className={Styles.name}>{name}</span>;
    };

    render () {
        const { role = 'wrapper', disabled } = this.props;
        const name = formatName(this.props.name);
        return <div className={Styles[role]}>
            <button onClick={disabled ? null : this.handlePokeLinkClick}
                    className={Styles.redirect}
                    disabled={disabled}>
                {this.createContent(name)}
            </button>
            {this.createInfo(name)}
        </div>;
    }
}

const mapDispatchToProps = dispatch => ({
    redirect : data => dispatch(showInPokedex(data)),
});

export default connect(null, mapDispatchToProps)(PokeLink)
