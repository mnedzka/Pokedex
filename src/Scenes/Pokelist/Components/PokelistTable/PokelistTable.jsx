import React from 'react';
import { connect } from 'react-redux';
import { setSorting } from 'Actions/actions.js';
import Styles from './PokelistTable.scss';
import PokelistItem from '../PokelistItem/PokelistItem.jsx';

class PokelistTable extends React.Component {

    createHeaders = headerArray => {
        const th = [];
        for (let [i, el] of headerArray.entries()) {
            let sortBy = el[0].toLowerCase().replace(' ', '-');
            if (el[0] === '#') {
                sortBy = 'id';
            }
            let cName = null;
            let callback = null;
            let sortDirection = null;
            if (el[1]) {
                cName = Styles.sort;
                callback = () => {this.props.setSorting(sortBy)};
                if (this.props.sortBy === sortBy) {
                    if (this.props.direction === 1) {
                        sortDirection = '↓';
                    } else {
                        sortDirection = '↑';
                    }
                }
            }
            th.push(<th key={i} className={cName} onClick={callback}>
                {el[0]}{sortDirection}
            </th>);
        }
        return th;
    };

    render () {
        let data = this.props.pokemonData.slice(1);
        const sortBy = this.props.sortBy;
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
        sortBy : state.pokemonList.sortBy,
        direction : state.pokemonList.sortDir,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setSorting : (sortBy) => dispatch(setSorting(sortBy)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PokelistTable);
