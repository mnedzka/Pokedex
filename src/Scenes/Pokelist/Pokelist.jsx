import React from 'react';
import { connect } from 'react-redux';
import { setLength } from 'Actions/actions.js';
import {
    PokeTable,
    PokelistItem,
} from 'Components/PokeTable/PokeTable.jsx';

const loadMoreBy = 100;

class Pokelist extends React.Component {
    handleScroll = ev => {
        const height = Math.max(
            document.documentElement.scrollHeight,
            document.body.scrollHeight,
        );
        const scroll = Math.round(window.innerHeight + window.scrollY);
        if (height === scroll) {
            if (this.props.length < 721) {
                console.log(this.props.length + loadMoreBy);
                this.props.setLen(this.props.length + loadMoreBy);
            }
        }
    };

    componentDidMount () {
        document.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount () {
        document.removeEventListener('scroll', this.handleScroll);
    }

    render () {
        const data = Object.values(this.props.data).slice(0, this.props.length);
        const list = <PokeTable headers="pokelist"
                        listItem={PokelistItem}
                        data={data} />;
        return <div>
            {list}
        </div>;
    }
}

const mapStateToProps = state => {
    return {
        length : state.pokelist.length,
        data : state.pokelist.data,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setLen : (number = loadMoreBy) => dispatch(setLength(number)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pokelist)
