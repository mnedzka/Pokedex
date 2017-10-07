import React from 'react';
import PokelistItem from '../PokelistItem/PokelistItem.jsx';
import Styles from './PokelistTable.scss';
import { connect } from 'react-redux';
import { setSorting } from '../../../../Actions/actions.js';

class PokelistTable extends React.Component {

    createHeaders = (headerArray) => {
        const th = [];
        for (let [i, el] of headerArray.entries()) {
            const sortWith = el[1];
            const text = el[0];
            const sortBy = text === '#' ? 'id' : text.toLowerCase().replace(' ', '-');
            let cName = null;
            let callback = null;
            let sortDirection = null;
            if (sortWith) {
                cName = Styles.sort;
                callback = () => {this.props.changeSorting(sortBy)};
                if (this.props.sorting === sortBy) {
                    if (this.props.direction === 1) {
                        sortDirection = '↓';
                    } else {
                        sortDirection = '↑';
                    }
                }
            }
            th.push(<th key={i} className={cName} onClick={callback}>
                {text}{sortDirection}
            </th>);
        }
        return th;
    };

    render () {
        let data = this.props.pokemonData.slice(1);
        const sortBy = this.props.sorting;
        if (sortBy) {
            data = data.sort((a, b) => {
                if (this.props.direction === 1) {
                    return a[sortBy] - b[sortBy];
                }
                return b[sortBy] - a[sortBy];
            });
        }
        const listContent = data.map((el, i) => {
            return <PokelistItem key={i} data={el} />
        });
        const headers = [
            ['IMG', false],
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
        return <table className={Styles.list}>
            <thead>
                <tr>
                    {this.createHeaders(headers)}
                </tr>
            </thead>
            <tbody>
                {listContent}
            </tbody>
        </table>;
    }
}

const mapStateToProps = state => {
    return {
        sorting : state.pokemonList.sorting,
        direction : state.pokemonList.sortDir,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeSorting : (sortBy) => dispatch(setSorting(sortBy)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PokelistTable);
