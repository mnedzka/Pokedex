import React from 'react';
import Styles from './NotFound.scss';

export default class NotFound extends React.Component {
    render () {
        return <div className={Styles.wrapper}>
            Request failed. The resource you are trying to get is either not available or does not exist.
            <div>
                <img src="./resources/icons/404.svg" />
            </div>
        </div>;
    }
}
