import React from 'react';
import { connect } from 'react-redux';
import {
    PokeTable,
    PokelistItem,
} from 'Components/PokeTable/PokeTable.jsx';

class Pokelist extends React.Component {
    render () {
        const data = this.props.data;
        const list = <PokeTable headers="pokelist" listItem={PokelistItem} data={data} />;
        return <div>
            {list}
        </div>;
    }
}

const mapStateToProps = state => {
    return {
        data : state.pokelist.data,
    };
};

export default connect(mapStateToProps)(Pokelist)
