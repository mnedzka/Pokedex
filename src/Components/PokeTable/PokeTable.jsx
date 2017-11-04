import React from 'react';
import Styles from './PokeTable.scss';
import { connect } from 'react-redux';
import {
    PokelistItem,
    MovelistItem,
} from './Components';

class PokeTableComponent extends React.Component {
    constructor (props) {
        super(props);
        let hasLvl = false;
        if (this.props.data.length && this.props.data[0].hasOwnProperty('level_learned_at')) {
            hasLvl = true;
        }
        const pokeHeaders = [
            ['Compare', false],
            ['#', true],
            ['Name', false],
            ['Type', false],
            ['HP', true],
            ['Attack', true],
            ['Defense', true],
            ['Special Attack', true],
            ['Special Defense', true],
            ['Speed', true],
        ];
        const moveHeaders = [
            ['#', true],
            ['Name', false],
            ['Lvl', hasLvl ? true : false],
            ['Power', true],
            ['PP', true],
            ['Accuracy', true],
            ['Class', false],
            ['Type', false],
        ];
        const isPoke = this.props.headers === 'pokelist';
        this.headers = isPoke ? pokeHeaders : moveHeaders;
        this.state = {
            sortBy : hasLvl ? 'level_learned_at' : 'id',
            sortDir : 1,
            length : isPoke ? 50 : 25,
        };
    }

    setSorting = sortBy => {
        this.setState({
            sortBy : sortBy,
            sortDir : this.state.sortDir * (-1),
        });
    };

    handleMouseDown = event => {
        let t = event.target;
        while (!/PokeTable__wrapper/.test(t.className)) {
            t = t.parentElement;
            if (/Layout/.test(t.className)) {
                return;
            }
        }
        const wrapper = t;
        const mX = event.screenX;
        const width = wrapper.clientWidth;
        const totalWidth = wrapper.scrollWidth;
        let previousX = null;
        if (width === totalWidth) {
            return;
        }
        const currentScroll = wrapper.scrollLeft;
        const handleMouseMove = ev => {
            const mmoveX = ev.screenX;
            if (Math.abs(previousX - mmoveX) < 3) {
                return;
            }
            previousX = mmoveX;
            wrapper.scrollLeft = currentScroll + (totalWidth - width) * ((mX - mmoveX) / (width >> 1));
        }
        const handleMouseUp = ev => {
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mousemove', handleMouseMove);
        }
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    handleShowMoreClick = () => {
        this.setState({
            length : this.state.length + 50,
        });
    };

    createHeaders = headerArray => {
        const th = [];
        for (let [i, el] of headerArray.entries()) {
            let sortBy = el[0].toLowerCase().replace(' ', '_');
            if (el[0] === '#') {
                sortBy = 'id';
            } else if (el[0] === 'Lvl') {
                sortBy = 'level_learned_at';
            }
            let cName = null;
            let callback = null;
            let sortDirectionText = null;
            if (el[1]) {
                cName = Styles.sort;
                callback = () => {this.setSorting(sortBy)};
                if (this.state.sortBy === sortBy) {
                    if (this.state.sortDir === 1) {
                        sortDirectionText = '↓';
                    } else {
                        sortDirectionText = '↑';
                    }
                }
            }
            th.push(<th key={i} className={cName} onClick={callback}>
                {el[0]}{sortDirectionText}
            </th>);
        }
        return <tr>{th}</tr>;
    };

    render () {
        if (!this.props.data.length) {
            return null;
        }
        const sortBy = this.state.sortBy;
        const data = this.props.data.sort((a, b) => {
            if (this.state.sortDir === 1) {
                return a[sortBy] - b[sortBy];
            } else {
                return b[sortBy] - a[sortBy];
            }
        }).slice(0, this.state.length);
        const Item = this.props.listItem;
        const listContent = data.map((el, i) => {
            const selected = this.props.compare.find(p => p.id === el.id);
            return <Item key={el.name} data={el} selected={selected ? true : false} compare={this.props.compare} />
        });
        let showMore = null;
        if (this.state.length < this.props.data.length) {
            showMore = <tr>
                <td colSpan={this.headers.length}>
                    <button onClick={this.handleShowMoreClick}
                            className={Styles.more}>
                        Show More
                    </button>
                </td>
            </tr>;
        }
        return <div className={Styles.wrapper} onMouseDown={this.handleMouseDown}>
            <table className={Styles.table}>
                <thead className={Styles.thead}>
                    {this.createHeaders(this.headers)}
                </thead>
                <tbody className={Styles.tbody}>
                    {listContent}
                    {showMore}
                </tbody>
            </table>
        </div>;
    }
}

const mapStateToProps = state => {
    return {
        compare : state.compare.pokemon,
    };
};

const PokeTable = connect(mapStateToProps)(PokeTableComponent);

export {
    PokeTable,
    PokelistItem,
    MovelistItem,
};
