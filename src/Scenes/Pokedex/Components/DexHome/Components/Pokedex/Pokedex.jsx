import React from 'react';
import Styles from './Pokedex.scss';
import { formatName } from 'src/utils';
import {
    PokeImg,
    PokeType,
    PokeLink,
    DataTable,
} from 'Components';

export default class Pokedex extends React.Component {
    constructor () {
        super();
        this.state = {
            id : 0,
            after : 0,
            length : 25,
        };
        this.updated = false;
    }

    componentDidMount () {
        document.addEventListener('scroll', this.handlePageScroll);
    }

    componentWillUnmount () {
        document.removeEventListener('scroll', this.handlePageScroll);
    }

    componentDidUpdate () {
        this.updated = false;
    }

    handlePageScroll = () => {
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

    handleBtnClick = (ev, id) => {
        if (id === this.state.id) {
            return this.setState({after : 0, id : 0});
        }
        const { clientWidth } = this.wrapper;
        const minWidth = 96;
        const rowLen = clientWidth / minWidth;
        const length = rowLen >= 5 ? 5 : ~~rowLen;
        const row = !(id % length) ? id / length - 1 : ~~(id / length);
        const after = row ? length * (row + 1) : length;
        this.setState({
            id,
            after,
        });
    };

    createContent = data => {
        const { id, after } = this.state;
        const content = [];
        data.forEach(poke => {
            const style = poke.id === id ? 'selected' : 'item';
            content.push(<button key={poke.id} className={Styles[style]}
                onClick={ev => {this.handleBtnClick(ev, poke.id)}}>
                <PokeImg id={poke.id} size="fill" />
                <span>{formatName(poke.name)}</span>
            </button>);
            if (poke.id === after) {
                content.push(this.createInfoContent(id));
            }
        });
        return content;
    }

    createInfoContent = id => {
        const pokemon = this.props.data[id - 1];
        const pokemonData = [
            [`No. ${id}`, <PokeLink id={id} name={pokemon.name} type="pokemon" />],
            ['Type', <PokeType type={pokemon.types} />],
            ['HP', pokemon.hp],
            ['Attack', pokemon.attack],
            ['Defense', pokemon.defense],
            ['Sp. Attack', pokemon.special_attack],
            ['SP. Defense', pokemon.special_defense],
        ];
        return <div className={Styles.info} key="info">
            <div className={Styles.pokemon}>
                <PokeImg id={id} size="fill" />
            </div>
            <div className={Styles.data}>
                <DataTable data={pokemonData} />
            </div>
        </div>;
    };

    wrapperRef = elem => {
        if (!elem) return;
        this.wrapper = elem;
    };

    render () {
        const { data } = this.props;
        const { length } = this.state;
        const content = this.createContent(data.slice(0, length));
        return <div className={Styles.wrapper} ref={this.wrapperRef}>
            {content}
        </div>;
    }
}
