import React from 'react';
import Styles from './PopUp.scss';
import { formatName } from 'src/utils';

export default class PopUp extends React.Component {
    constructor () {
        super();
        this.state = {
            top : '-2rem',
        };
    }

    componentDidMount () {
        const timeout = setTimeout(() => {
            clearTimeout(timeout);
            this.setState({
                top : `${this.props.top * 2}rem`,
            });
        }, 100);
    }

    componentWillReceiveProps (nextProps) {
        this.setState({
            top : `${nextProps.top * 2}rem`,
        });
    }

    render () {
        const { data } = this.props;
        const type = data.add ? 'add' : 'remove';
        const message = `Compare: ${data.add ? 'Added' : 'Removed'} ${formatName(data.name)} #${data.pokeID}.`;
        return <div className={Styles[type]} style={this.state}>
            {message}
        </div>;
    }
}
