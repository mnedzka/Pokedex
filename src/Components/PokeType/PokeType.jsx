import React from 'react';
import Styles from './PokeType.scss';
import { connect } from 'react-redux';
import { showInPokedex } from 'Actions';
import { formatName } from 'src/utils';

class PokeType extends React.Component {
    shouldComponentUpdate (nextProps) {
        if (nextProps === this.props) {
            return false;
        }
        return true;
    }

    handleClick = id => {
        return this.props.redirect({
            id,
            type : 'type',
        });
    };

    render () {
        return this.props.type.map((type, i) => {
            const text = formatName(type.name);
            return <span key={i}
                className={Styles[type.name]}
                onClick={() => this.handleClick(type.id)}>
                {text}
            </span>;
        });
    }
}

const mapDispatchToProps = dispatch => ({
    redirect : data => dispatch(showInPokedex(data)),
});

export default connect(null, mapDispatchToProps)(PokeType);
