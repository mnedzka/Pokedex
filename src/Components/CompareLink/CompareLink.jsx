import React from 'react';
import Styles from './CompareLink.scss';
import { connect } from 'react-redux';
import { formatName } from 'src/utils';
import {
    addCompare,
    removeCompare,
} from 'Actions';

class CompareLink extends React.Component {
    shouldComponentUpdate (nextProps) {
        const isReadyEqual = this.props.ready === nextProps.ready;
        const isRemoveEqual = this.props.remove === nextProps.remove;
        if (isReadyEqual && isRemoveEqual) {
            return false;
        }
        return true;
    }

    handleClick = ev => {
        const { id, name, notify = false } = this.props;
        if (this.props.hasOwnProperty('click') && typeof this.props.click === 'function') {
            this.props.click();
        }
        if (this.props.remove) {
            return this.props.removeCompare(id, name, notify);
        }
        if (this.props.pokemon.find(p => p.id === id)) {
            return alert(`${formatName(name)} is already added.`);
        }
        return this.props.addCompare(id, name, notify);
    };

    createContent = name => {
        if (this.props.info) {
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
        const role = this.props.info ? 'search' : 'wrapper';
        let readyState;
        switch (this.props.ready) {
            case false:
                readyState = 'loading';
                break;
            case true:
                readyState = 'ready';
                break;
            default:
                readyState = 'compare';
        }
        const name = formatName(this.props.name);
        return <div className={Styles[role]}>
            <button onClick={this.handleClick} className={Styles[readyState]}>
                {this.createContent(name)}
            </button>
        </div>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addCompare : (id, name, notify) => dispatch(addCompare(id, name, notify)),
        removeCompare : (id, name, notify) => dispatch(removeCompare(id, name, notify)),
    };
};

export default connect(null, mapDispatchToProps)(CompareLink)
