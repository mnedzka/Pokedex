import React from 'react';
import Styles from './Notification.scss';
import { PopUp } from './Components';

export default class Notification extends React.Component {
    constructor () {
        super();
        this.state = {
            notifications : [],
        };
    }

    terminateNotification = notification => {
        const notify = this.state.notifications.slice();
        const next = notify.map(n => {
            if (n.id === notification.id) return {...n, dead : true};
            return n;
        });
        this.setState({
            notifications : next,
        });
    }

    shouldComponentUpdate (nextProps, nextState) {
        if (nextProps.data === this.props.data && nextState === this.state) {
            return false;
        }
        return true;
    }

    componentWillReceiveProps (nextProps) {
        let notify = this.state.notifications.slice();
        const isAdded = notify.find(n => n.id === nextProps.data.id && !n.dead);
        if (!nextProps.data || isAdded || nextProps.data === this.props.data) return;
        if (notify.every(n => n.dead)) notify = [];
        const newItem = {
            ...nextProps.data,
            dead : false,
            kill : setTimeout(() => {
                clearTimeout(newItem.kill);
                this.terminateNotification(newItem);
            }, 3000),
        };
        notify.push(newItem);
        this.setState({
            notifications : notify,
        });
    }

    render () {
        let alive = 0;
        const popups = this.state.notifications.map((n, i) => {
            return <PopUp key={i} top={n.dead ? -1 : alive++} data={n} />
        });
        return <div className={Styles.wrapper}>
            {popups}
        </div>;
    }
}
