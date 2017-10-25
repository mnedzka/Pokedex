import React from 'react';
import Styles from './MovelistItem.scss';
import PokeType from 'Components/PokeType/PokeType.jsx';
import PokeLink from 'Components/PokeLink/PokeLink.jsx';
import MoveClass from 'Components/MoveClass/MoveClass.jsx';

export default class MovelistItem extends React.Component {
    shouldComponentUpdate (nextProps) {
        if ( this.props.data === nextProps.data ) {
            return false;
        } else {
            return true;
        }
    }

    render () {
        const move = this.props.data;
        return <tr>
            <td>
                {move.id}
            </td>
            <td>
                <PokeLink name={move.name} id={move.id} type="move" />
            </td>
            <td>
                {move.level_learned_at || '-'}
            </td>
            <td>
                {move.power || '-'}
            </td>
            <td>
                {move.pp || '-'}
            </td>
            <td>
                {move.accuracy || '-'}
            </td>
            <td>
                <MoveClass data={move.damage_class} />
            </td>
            <td>
                <span className={Styles.center}>
                    <PokeType type={move.types} />
                </span>
            </td>
        </tr>;
    }
}
