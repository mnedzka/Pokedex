import React from 'react';
import Styles from './CompareLink.scss';
import { connect } from 'react-redux';
import {
    addCompare,
    removeCompare,
} from 'Actions';
import { formatName } from 'src/utils';

class CompareLink extends React.Component {
    shouldComponentUpdate (nextProps) {
        const isReadyEqual = this.props.ready === nextProps.ready;
        const isRemoveEqual = this.props.remove === nextProps.remove;
        const compareEqual = this.props.pokemon === nextProps.pokemon;
        if (isReadyEqual && isRemoveEqual && compareEqual) {
            return false;
        }
        return true;
    }

    handleClick = ev => {
        const { id, name, notify = false } = this.props;
        if (this.props.hasOwnProperty('click')) {
            this.props.click();
        }
        if (this.props.remove) {
            return this.props.removeCompare(id, name, notify);
        }
        if (this.props.pokemon.find(p => p.id === id)) {
            return alert('blabla this pokemon has been already added');
        }
        // if (this.props.pokemon.length > 3) {
        //     return alert('BLA BLA TO MANY POKEMONs');
        // }
        return this.props.addCompare(id, name, notify);
    };

    createContent = (name, role) => {
        if (role === 'search') {
            return <span>
                {this.props.children}
                <span className={Styles.name}>{name}</span>
                <span className={Styles.infoText}>{' ' + this.props.info}</span>
            </span>;
        }
        let icon = null;
        if (this.props.remove) {
            icon = <span className={Styles.remove}>
                <img src="./resources/icons/remove.svg" />
            </span>;
        } else {
            icon = <span className={Styles.add}>
                <img src="./resources/icons/add.svg" />
            </span>
        }
        return <span>
            {this.props.children}
            {icon}
        </span>;
    };

    render () {
        const role = this.props.role ? this.props.role : 'wrapper';
        let ready = 'compare';
        switch (this.props.ready) {
            case false:
                ready = 'loading';
                break;
            case true:
                ready = 'ready';
                break;
        }
        const name = formatName(this.props.name);
        return <div className={Styles[role]}>
            <button onClick={this.handleClick} className={Styles[ready]}>
                {this.createContent(name, this.props.role)}
            </button>
        </div>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addCompare : (id, name, role) => dispatch(addCompare(id, name, role)),
        removeCompare : (id, name, role) => dispatch(removeCompare(id, name, role)),
    };
};

export default connect(null, mapDispatchToProps)(CompareLink)
