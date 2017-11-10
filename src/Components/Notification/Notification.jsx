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
        if (!nextProps.data || nextProps.data === this.props.data) {
            return;
        }
        let notify = this.state.notifications.slice().filter(n => !n.dead);
        const isAdded = notify.find(n => n.id === nextProps.data.id);
        if (isAdded) {
            notify = notify.filter(n => n.id !== isAdded.id);
            clearTimeout(isAdded.kill);
        };
        const popUp = {
            ...nextProps.data,
            dead : false,
            kill : setTimeout(() => {
                clearTimeout(popUp.kill);
                this.terminateNotification(popUp);
            }, 2000),
        };
        notify.push(popUp);
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
