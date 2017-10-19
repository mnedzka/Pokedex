import React from 'react';
import Styles from './PokeTable.scss';
import PokelistItem from './Components/PokelistItem/PokelistItem.jsx';
import MovelistItem from './Components/MovelistItem/MovelistItem.jsx';

class PokeTable extends React.Component {
    constructor (props) {
        super(props);
        let hasLvl = false;
        if (this.props.data.length && this.props.data[0].hasOwnProperty('level_learned_at')) {
            hasLvl = true;
        }
        this.headers = {
            pokelist : [
                ['', false],
                ['#', true],
                ['Name', false],
                ['Type', false],
                ['HP', true],
                ['Attack', true],
                ['Defense', true],
                ['Special Attack', true],
                ['Special Defense', true],
                ['Speed', true],
            ],
            movelist : [
                ['#', true],
                ['Name', false],
                ['Lvl', hasLvl ? true : false],
                ['Power', true],
                ['PP', true],
                ['Accuracy', true],
                ['Class', false],
                ['Type', false],
            ],
        };
        this.state = {
            sortBy : hasLvl ? 'level_learned_at' : 'id',
            sortDir : 1,
        };
    }

    setSorting = sortBy => {
        this.setState({
            sortBy : sortBy,
            sortDir : this.state.sortDir * (-1),
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
        let data = this.props.data.slice();
        if (!data.length) {
            return '--';
        }
        const sortBy = this.state.sortBy;
        data = data.sort((a, b) => {
            if (this.state.sortDir === 1) {
                return a[sortBy] - b[sortBy];
            } else {
                return b[sortBy] - a[sortBy];
            }
        });
        const Item = this.props.listItem;
        const listContent = data.map((el, i) => {
            return <Item key={el.name} data={el} />
        });
        let headers = this.headers[this.props.headers];
        return <div className={Styles.wrapper}>
            <table className={Styles.table}>
                <thead className={Styles.thead}>
                    {this.createHeaders(headers)}
                </thead>
                <tbody className={Styles.tbody}>
                    {listContent}
                </tbody>
            </table>
        </div>;
    }
}

export {
    PokeTable,
    PokelistItem,
    MovelistItem,
};
