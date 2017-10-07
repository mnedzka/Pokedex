import React from 'react';
import Styles from './Loader.scss';

export default class Loader extends React.Component {
    render () {
        return <img className={Styles.loader} src="./resources/icons/loader.svg" />
    }
}
