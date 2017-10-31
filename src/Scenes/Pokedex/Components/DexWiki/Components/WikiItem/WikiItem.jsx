import React from 'react';
import Styles from './WikiItem.scss';

export default class WikiItem extends React.Component {
    render () {
        return <div className={Styles.section}>
            <h5>Item</h5>
            <p>
                <span className={Styles.keyword}>Category </span>
                - since Gen. II items are divided into categories to help with overall organization. These categories have varied between games. Some of the item categories are: Held Item (given to pokemon to hold by its Trainer), Evolutionary Stones, Fossils, Poke Balls, Mail, Berries, Medicine, TM's.
            </p>
        </div>;
    }
}
