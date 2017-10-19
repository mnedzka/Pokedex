import React from 'react';
import Styles from './MoveClass.scss';

export default class MoveClass extends React.Component {
    shouldComponentUpdate (nextProps) {
        if (nextProps === this.props) {
            return false;
        }
        return true;
    }

    render () {
    const cl = this.props.data;
    return <span className={Styles.center}>
        <span className={Styles[cl]}>
            {cl.replace(/\b(\w)/g, m => m.toUpperCase())}
        </span>
    </span>
    }
}
