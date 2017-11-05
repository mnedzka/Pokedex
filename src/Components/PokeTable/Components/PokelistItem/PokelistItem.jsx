import React from 'react';
import {
    PokeType,
    PokeLink,
    PokeImg,
    CompareLink,
} from 'Components';

export default class PokelistItem extends React.Component {
    shouldComponentUpdate (nextProps) {
        const isDataEqual = this.props.data === nextProps.data;
        const isSelectEqual = this.props.selected === nextProps.selected;
        if (isDataEqual && isSelectEqual) {
            return false;
        }
        return true;
    }

    render () {
        const {
            id, name, types, hp, attack, speed, defense, special_attack, special_defense
        } = this.props.data;
        const { compare, selected } = this.props;
        return <tr>
            <td>
                <CompareLink id={id} ready={selected ? true : null}
                    remove={selected} name={name} pokemon={compare} notify={true}>
                    <PokeImg id={id} />
                </CompareLink>
            </td>
            <td>
                {id}
            </td>
            <td>
                <PokeLink id={id} name={name} type="pokemon" />
            </td>
            <td>
                <PokeType type={types} />
            </td>
            <td>
                {hp}
            </td>
            <td>
                {attack}
            </td>
            <td>
                {defense}
            </td>
            <td>
                {special_attack}
            </td>
            <td>
                {special_defense}
            </td>
            <td>
                {speed}
            </td>
        </tr>;
    }
}
