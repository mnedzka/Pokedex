import React from 'react';
import Styles from './MenuItem.scss';
import { connect } from 'react-redux';
import { changePage } from '../../../../Actions/actions.js';

class MenuItem extends React.Component {
    handleClickEvent = (ev) => {
        const page = this.props.text.toLowerCase().replace(/\W/g, '');
        if (this.props.page === page) {
            return null;
        }
        this.props.onMenuItemClick(page);
        return null;
    }

    render () {
        return <button
            className={Styles.item}
            disabled={this.props.disabled}
            onClick={this.handleClickEvent}>
            {this.props.text}
        </button>;
    }
}

const mapStateToProps = state => {
    return {
        page : state.page.currentPage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onMenuItemClick : (page) => dispatch(changePage(page)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem)
