import React from 'react';
import Styles from './MenuItem.scss';
import { connect } from 'react-redux';
import { changePage } from 'Actions';

class MenuItem extends React.Component {
    shouldComponentUpdate (nextProps) {
        if (nextProps === this.props) {
            return false;
        }
        return true;
    }

    handleClickEvent = (ev) => {
        const { page, dexItemType, text, onMenuItemClick } = this.props;
        const pageName = text.toLowerCase();
        if (page !== pageName || (dexItemType !== 'pokedex' && page === 'pokedex')) {
            onMenuItemClick(pageName);
        }
    }

    render () {
        return <button className={Styles.item} onClick={this.handleClickEvent}
                disabled={this.props.disabled}>
            {this.props.text}
        </button>;
    }
}

const mapStateToProps = state => ({
    page : state.page.currentPage,
    dexItemType : state.page.dexItemType,
});

const mapDispatchToProps = (dispatch) => ({
    onMenuItemClick : (page) => dispatch(changePage(page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuItem)
