import React from 'react';
import PokeType from 'Components/PokeType/PokeType.jsx';
import PokeLink from 'Components/PokeLink/PokeLink.jsx';
import PokeImg from 'Components/PokeImg/PokeImg.jsx';

export default class PokelistItem extends React.Component {
    shouldComponentUpdate (nextProps) {
        if ( this.props.data === nextProps.data ) {
            return false;
        } else {
            return true;
        }
    }

    render () {
        const {
            id, name, types, hp, attack, speed, defense, special_attack, special_defense
         } = this.props.data;
        return <tr>
            <td>
                <PokeImg id={id} />
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
