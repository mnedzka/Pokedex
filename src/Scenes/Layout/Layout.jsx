import React from 'react';
import Styles from './Layout.scss';
import Menu from './Components/Menu/Menu.jsx';


class Layout extends React.Component {
    render () {
        return <div className={Styles.scene}>
            <div className={Styles.block}>
                <Menu />
            </div>
            <div className={Styles.block}>
                <h1 className={Styles.title}>
                    {this.props.title}
                </h1>
                <div className={Styles.wrapper}>
                    {this.props.children}
                </div>
            </div>
        </div>;
    }
}

export default Layout
