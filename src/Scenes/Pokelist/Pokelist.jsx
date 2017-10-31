import React from 'react';
import Styles from './Pokelist.scss';
import { connect } from 'react-redux';
import {
    PokeTable,
    PokelistItem,
} from 'Components/PokeTable/PokeTable.jsx';

class Pokelist extends React.Component {
    constructor () {
        super();
        this.state = {
            typeFilter : 'true',
        };
    }

    handleSelectChange = ev => {
        this.setState({
            typeFilter : ev.target.value,
        });
    };

    render () {
        const data = this.props.data.slice().filter(p => {
            if (this.state.typeFilter === 'true') {
                return p;
            };
            return p.types.some(t => t.name === this.state.typeFilter);
        });
        const list = <PokeTable headers="pokelist" listItem={PokelistItem} data={data} />;
        return <div>
            <div className={Styles.filter}>
                <label>
                    Filter by type:
                    <select onChange={this.handleSelectChange}>
                        <option value>- All -</option>
                        <option value="normal">Normal</option>
                        <option value="fighting">Fighting</option>
                        <option value="flying">Flying</option>
                        <option value="poison">Poison</option>
                        <option value="ground">Ground</option>
                        <option value="rock">Rock</option>
                        <option value="bug">Bug</option>
                        <option value="ghost">Ghost</option>
                        <option value="steel">Steel</option>
                        <option value="fire">Fire</option>
                        <option value="water">Water</option>
                        <option value="grass">Grass</option>
                        <option value="electric">Electric</option>
                        <option value="psychic">Psychic</option>
                        <option value="ice">Ice</option>
                        <option value="dragon">Dragon</option>
                        <option value="dark">Dark</option>
                        <option value="fairy">Fairy</option>
                    </select>
                </label>
            </div>
            <div className={Styles.section}>
                {list}
            </div>
        </div>;
    }
}

const mapStateToProps = state => {
    return {
        data : state.pokelist.data,
    };
};

export default connect(mapStateToProps)(Pokelist)
