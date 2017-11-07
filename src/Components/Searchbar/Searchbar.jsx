import React from 'react';
import Styles from './Searchbar.scss';
import {
    PokeLink,
    Loader,
} from 'Components';

export default class Searchbar extends React.Component {
    constructor () {
        super();
        this.state = {
            input : '',
            results : [],
        };
    }

    searchFilter = (phrase, pokeOnly) => {
        const MAX_RESULTS = 10;
        const items = this.props.data;
        const results = [];
        const isArr = Array.isArray(items);
        if (pokeOnly) {
            const item = isArr ? items : items.pokemon;
            const len = item.length;
            let res = 0;
            for (let i = 0; i < len; i++) {
                if (item[i].id.toString().startsWith(phrase)) {
                    results.push({
                        ...item[i],
                        type : 'pokemon',
                    });
                    res = res + 1;
                }
                if (res >= MAX_RESULTS) {
                    break;
                }
            }
            return results;
        }
        if (isArr) {
            const len = items.length;
            let res = 0;
            for (let i = 0; i < len; i++) {
                if (items[i].name.includes(phrase)) {
                    results.push({
                        ...items[i],
                        type : 'pokemon',
                    });
                    res = res + 1;
                }
                if (res >= MAX_RESULTS) {
                    break;
                }
            }
            return results;
        }
        let res = 0;
        for (let i in items) {
            const len = items[i].length;
            for (let j = 0; j < len; j++) {
                if (items[i][j].name.includes(phrase)) {
                    results.push({
                        ...items[i][j],
                        type : i,
                    });
                    res = res + 1;
                }
                if (res >= MAX_RESULTS) {
                    break;
                }
            }
            if (res >= MAX_RESULTS) {
                break;
            }
        }
        return results;
    };

    handleInputChange = ev => {
        const inp = ev.target.value;
        const pokeOnly = /#\d+/.test(inp);
        let res;
        if (inp.length > 1) {
            if (pokeOnly) {
                res = this.searchFilter(inp.slice(1), pokeOnly);
            } else {
                res = this.searchFilter(inp.replace(' ', '-').toLowerCase());
            }
            return this.setState({
                input : inp,
                results : res,
            });
        }
        return this.setState({
            input : inp,
            results : [],
        });
    };

    emptyResults = () => {
        this.setState({
            input : '',
            results : [],
        });
    };

    handleKeyDown = ev => {
        const key = ev.keyCode || ev.which;
        if (this.state.results.length && (key === 38 || key === 40)) {
            ev.preventDefault();
            const res = [...document.querySelectorAll('[class*="Searchbar"] button[class*="Link"]')];
            const active = document.activeElement;
            const ind = res.indexOf(active);
            const isLast = ind === res.length - 1;
            active.blur();
            if (key === 38) {
                if (ind < 1) {
                    res[res.length - 1].focus();
                } else {
                    res[ind - 1].focus();
                }
            } else {
                if (ind < 0 || isLast) {
                    res[0].focus();
                } else {
                    res[ind + 1].focus();
                }
            }
        }
    };

    handleOutsideClick = ev => {
        const inside = this.wrapper.contains(ev.target);
        if (this.state.input.length && !inside) {
            return this.emptyResults();
        }
    };

    componentWillMount () {
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('click', this.handleOutsideClick);
    }

    componentWillUnmount () {
        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('click', this.handleOutsideClick);
    }

    render () {
        const { Item, absolute = false } = this.props;
        const { input, results } = this.state;
        const searchResults = results.map(r => {
            return <Item click={this.emptyResults} key={r.name + r.id} data={r} />
        });
        return <div>
            <div className={Styles.search} ref={e => this.wrapper = e}>
                <input className={Styles.input}
                    onChange={this.handleInputChange}
                    value={input}
                    placeholder="Enter name or #ID" type="text" />
                <div className={absolute ? Styles.absolute : null}>
                    {searchResults}
                </div>
            </div>
        </div>;
    }
}
