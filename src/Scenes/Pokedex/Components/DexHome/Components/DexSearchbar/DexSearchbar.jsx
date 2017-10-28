import React from 'react';
import { connect } from 'react-redux';
import Styles from './DexSearchbar.scss';
import PokeLink from 'Components/PokeLink/PokeLink.jsx';

class DexSearchbar extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            input : '',
            results : [],
        };
    }

    handleInputChange = ev => {
        const inp = ev.target.value;
        const filterById = /#\d+/.test(inp);
        let res = this.props.data.slice();
        if (inp.length > 1 && filterById) {
            res = res.filter(p => p.id.toString().startsWith(inp.slice(1)));
        } else if (inp.length < 3) {
            return this.setState({
                input : inp,
                results : [],
            });
        } else {
            res = res.filter(p => p.name.includes(inp.toLowerCase()));
        }
        return this.setState({
            input : inp,
            results : res,
        });
    };

    render () {
        console.log(this);
        const results = this.state.results.slice(0, 10).map(p => {
            return <div key={p.id} className={Styles.row}>
                <PokeLink id={p.id} name={p.name} info={'#' + p.id} type="pokemon" />
            </div>;
        });
        console.log(results);
        return <div className={Styles.wrapper}>
            <h5>Search Pokemon</h5>
            <p>Use Pokemons' name or type '#&lt;Number&gt;' to search by pokedex number.</p>
            <input onChange={this.handleInputChange} value={this.state.input} placeholder="search" type="text" />
            <div>
                {results}
            </div>
        </div>;
    }
}

const mapStateToProps = state => {
    return {
        data : state.pokelist.data,
    }
};

export default connect(mapStateToProps)(DexSearchbar)
