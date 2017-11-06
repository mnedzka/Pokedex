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

    changeSorting = sortBy => {
        this.setState({
            sortBy : sortBy,
            sortDir : this.state.sortDir * (-1),
        });
    };

    handleMouseDown = event => {
        const wrapper = this.wrapper;
        const posX = event.screenX;
        const width = wrapper.clientWidth;
        const totalWidth = wrapper.scrollWidth;
        let previousX = null;
        if (width === totalWidth) {
            return;
        }
        const currentScroll = wrapper.scrollLeft;
        const handleMouseMove = ev => {
            const moveX = ev.screenX;
            if (Math.abs(previousX - moveX) < 3) {
                return;
            }
            previousX = moveX;
            wrapper.scrollLeft = currentScroll + (totalWidth - width) * ((posX - moveX) / (width >> 1));
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
        const headers = [];
        headerArray.forEach((head, i) => {
            let sort = head[0].toLowerCase().replace(' ', '_');
            if (sort === '#') sort = 'id';
            else if (sort === 'Lvl') sort = 'level_learned_at';
            let className = null;
            let clickCallback = null;
            let sortDirectionText = null;
            if (head[1]) {
                className = Styles.sort;
                clickCallback = () => {this.changeSorting(sort)};
                if (this.state.sortBy === sort) {
                    if (this.state.sortDir === 1) {
                        sortDirectionText = '↓';
                    } else {
                        sortDirectionText = '↑';
                    }
                }
            }
            headers.push(<th key={i} className={className} onClick={clickCallback}>
                {head[0]}{sortDirectionText}
            </th>);
        });
        return <tr>{headers}</tr>;
    };

    createContent = contentData => {
        const { Item, compare, data } = this.props;
        const { length } = this.state;
        const content = contentData.map((el, i) => {
            const selected = compare.find(poke => poke.id === el.id);
            return <Item key={el.name} data={el}
                    selected={selected ? true : false} compare={compare} />;
        });
        if (length < data.length) {
            content.push(<tr key="showmore">
                <td colSpan={this.headers.length}>
                    <button onClick={this.handleShowMoreClick} className={Styles.more}>
                        Show More
                    </button>
                </td>
            </tr>);
        }
        return content;
    };

    render () {
        const { sortBy, sortDir = 1, length} = this.state;
        const data = this.props.data.sort((a, b) => {
            if (sortDir === 1) {
                return a[sortBy] - b[sortBy];
            } else {
                return b[sortBy] - a[sortBy];
            }
        }).slice(0, length);
        return <div className={Styles.wrapper} ref={w => this.wrapper = w} onMouseDown={this.handleMouseDown}>
            <table className={Styles.table}>
                <thead className={Styles.thead}>
                    {this.createHeaders(this.headers)}
                </thead>
                <tbody className={Styles.tbody}>
                    {this.createContent(data)}
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
