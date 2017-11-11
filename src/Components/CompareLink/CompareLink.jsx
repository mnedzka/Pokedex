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
        const {
            id, name, remove, notify = false, click, removeCompare, addCompare, pokemon
        } = this.props;
        if (click && typeof click === 'function') {
            click();
        }
        if (remove) {
            return removeCompare(id, name, notify);
        }
        if (pokemon.find(p => p.id === id)) {
            return alert(`${formatName(name)} is already added.`);
        }
        return addCompare(id, name, notify);
    };

    createContent = name => {
        const { info, children, remove } = this.props;
        if (info) {
            return <span>
                {children}
                <span className={Styles.name}>{name}</span>
                <span className={Styles.infoText}>{' ' + info}</span>
            </span>;
        }
        let iconClassName = 'add';
        if (remove) {
            iconClassName = 'remove';
        }
        return <span>
            {children}
            <span className={Styles[iconClassName]}>
                <svg role="img" viewBox="0 0 512 512">
                    <use xlinkHref="./resources/icons/icons.svg#compare" />
                </svg>
            </span>
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

const mapDispatchToProps = dispatch => ({
    addCompare : (id, name, notify) => dispatch(addCompare(id, name, notify)),
    removeCompare : (id, name, notify) => dispatch(removeCompare(id, name, notify)),
});

export default connect(null, mapDispatchToProps)(CompareLink)
