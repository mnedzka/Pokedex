import React from 'react';
import Styles from './MovelistItem.scss';
import {
    PokeType,
    PokeLink,
    MoveClass,
} from 'Components';

export default class MovelistItem extends React.Component {
    shouldComponentUpdate (nextProps) {
        if ( this.props.data === nextProps.data ) {
            return false;
        }
        return true;
    }

    render () {
        const {
            id, name, level_learned_at = false, power, pp, accuracy, damage_class, types
        } = this.props.data;
        return <tr>
            <td>
                {id}
            </td>
            <td>
                <PokeLink name={name} id={id} type="move" />
            </td>
            <td>
                {level_learned_at || '-'}
            </td>
            <td>
                {power || '-'}
            </td>
            <td>
                {pp || '-'}
            </td>
            <td>
                {accuracy || '-'}
            </td>
            <td>
                <MoveClass data={damage_class} />
            </td>
            <td>
                <span className={Styles.center}>
                    <PokeType type={types} />
                </span>
            </td>
        </tr>;
    }
}
