import React from 'react';
import Styles from './Pokelist.scss';
import { connect } from 'react-redux';
import {
    PokeTable,
    PokelistItem,
} from 'Components';

class Pokelist extends React.Component {
    constructor () {
        super();
        this.state = {
            typeFilter : 'true',
            length : 25,
        };
        this.updated = false;
        this.height;
    }

    handleSelectChange = ev => {
        this.setState({
            typeFilter : ev.target.value,
        });
    };

    handlePageScroll = ev => {
        const { length } = this.state;
        if (length > 800) return;
        const { clientHeight, offsetTop } = this.wrapper;
        const { scrollY, innerHeight } = window;
        const delta = clientHeight - scrollY - innerHeight;
        if (!this.height) this.height = clientHeight;
        if (delta < 0 && !this.updated) {
            this.updated = true;
            return this.setState({
                length : length + 25,
            });
        }
        if (delta - offsetTop > this.height) {
            return this.setState({
                length : length - 25,
            });
        }
    };

    componentDidUpdate () {
        this.updated = false;
    }

    componentDidMount () {
        document.addEventListener('scroll', this.handlePageScroll);
    }

    componentWillUnmount () {
        document.removeEventListener('scroll', this.handlePageScroll);
    }

    render () {
        const { length } = this.state;
        const data = this.props.data.slice().filter(p => {
            if (this.state.typeFilter === 'true') {
                return p;
            };
            return p.types.some(t => t.name === this.state.typeFilter);
        });
        const list = <PokeTable headers="pokelist" Item={PokelistItem} data={data} forceMaxLen={length} />;
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
            <div className={Styles.section} ref={el => this.wrapper = el}>
                {list}
            </div>
        </div>;
    }
}

const mapStateToProps = state => ({
    data : state.pokelist.data,
});

export default connect(mapStateToProps)(Pokelist)
