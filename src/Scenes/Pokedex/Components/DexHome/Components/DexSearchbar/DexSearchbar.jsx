import React from 'react';
import Styles from './DexSearchbar.scss';
import {
    PokeLink,
    Loader,
} from 'Components';
const items = require('./searchNames.json');

export default class DexSearchbar extends React.Component {
    constructor () {
        super();
        this.state = {
            input : '',
            results : [],
        };
    }

    handleInputChange = ev => {
        const inp = ev.target.value;
        const filterById = /#\d+/.test(inp);
        let res;
        if (inp.length > 1 && filterById) {
            res = items.filter(p => p.type === 'pokemon' && p.id.toString().startsWith(inp.slice(1)));
        } else if (inp.length < 3) {
            return this.setState({
                input : inp,
                results : [],
            });
        } else {
            res = items.filter(p => p.name.includes(inp.replace(' ', '-').toLowerCase()));
        }
        return this.setState({
            input : inp,
            results : res,
        });
    };

    render () {
        const results = this.state.results.slice(0, 10).map(r => {
            const info = r.type === 'pokemon' ? `#${r.id}` : `(${r.type})`;
            return <div className={Styles.row} key={r.name + r.id}>
                <PokeLink id={r.id} name={r.name} type={r.type} info={info} role="searchResult">
                    <img className={Styles.icon} src={`./resources/icons/${r.type}.svg`} />
                </PokeLink>
            </div>;
        });
        console.log(results);
        return <div className={Styles.wrapper}>
            <h5>Search</h5>
            <p>Use Pokemon, Move, Ability, Item name or type '#&lt;Number&gt;' to search Pokemon by pokedex number.</p>
            <input className={Styles.input}
                onChange={this.handleInputChange}
                value={this.state.input}
                placeholder="search" type="text" />
            <div>
                {results}
            </div>
        </div>;
    }
}
