import React from 'react';
import Styles from './PokeType.scss';
import { connect } from 'react-redux';
import { showInPokedex } from 'Actions/actions.js';

class PokeType extends React.Component {
    handleClick = url => {
        const typeId = url.match(/\/(\d+)\//)[1];
        return this.props.redirect({
            type : 'type',
            id : typeId,
        });
    };

    render () {
        const typesMap = this.props.types.map((el, i) => {
            const name = el.type.name;
            const typeText = `${name.substr(0, 1).toUpperCase()}${name.substr(1)}`;
            return <span
                className={Styles[name]}
                key={i}
                onClick={() => this.handleClick(el.type.url)}>
                {typeText}
            </span>;
        });
        return typesMap;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        redirect : (data) => dispatch(showInPokedex(data)),
    };
};

export default connect(null, mapDispatchToProps)(PokeType);
