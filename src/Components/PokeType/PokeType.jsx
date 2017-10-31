import React from 'react';
import Styles from './PokeType.scss';
import { connect } from 'react-redux';
import { showInPokedex } from 'Actions';

class PokeType extends React.Component {
    shouldComponentUpdate (nextProps) {
        if (nextProps === this.props) {
            return false;
        }
        return true;
    }

    handleClick = id => {
        return this.props.redirect({
            type : 'type',
            id : id,
        });
    };

    render () {
        return this.props.type.map((el, i) => {
            const name = el.name;
            const text = name.replace(/\b(\w)/g, m => m.toUpperCase());
            return <span key={i}
                className={Styles[name]}
                onClick={() => this.handleClick(el.id)}>
                {text}
            </span>;
        });
    }
}

const mapDispatchToProps = dispatch => {
    return {
        redirect : (data) => dispatch(showInPokedex(data)),
    };
};

export default connect(null, mapDispatchToProps)(PokeType);
