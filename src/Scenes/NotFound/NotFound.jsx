import React from 'react';
import Styles from './NotFound.scss';
import { connect } from 'react-redux';
import {
    PokeLink,
} from 'Components';

class NotFound extends React.Component {
    render () {
        return <div className={Styles.wrapper}>
            <div>
                <img src="./resources/icons/404.svg" />
            </div>
            Request failed.
            <PokeLink name="Retry?" id={this.props.id} type={this.props.type} />
        </div>;
    }
}

const mapStateToProps = state => {
    return {
        id : state.page.dexItemId,
        type : state.page.dexItemType,
    };
};

export default connect(mapStateToProps)(NotFound)
