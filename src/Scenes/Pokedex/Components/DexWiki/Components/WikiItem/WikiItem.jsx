import React from 'react';
import Styles from './WikiItem.scss';

export default class WikiItem extends React.Component {
    render () {
        return <div className={Styles.section}>
            <h5>Item</h5>
            <p>
                <span className={Styles.keyword}>Category </span>
                - since Gen. II items are divided into categories to help with overall organization. These categories have varied between games.
            </p>
            <p>
                <span className={Styles.keyword}>Fling Effect </span>
                - effect of Fling move when holding specified item. Fling move will fail if user has no held item. After using Fling the item is consumed.
            </p>
            <h5>Item Categories</h5>
            <ul>
                <li>
                    <span className={Styles.keyword}>Items </span>- The Items pocket contains all items that are not put in another pocket. Some items are: Escape Ropes, Escape items (Poke Doll, Fluffy Tail), Evolutionary Stones, Valuable items, Flutes, Fossils, Honey, Mulch, Repels, Held Items.</li>
                <li>
                    <span className={Styles.keyword}>Poke Balls </span>- used for catching Pokémon.</li>
                <li>
                    <span className={Styles.keyword}>Mail </span>- an item given to a Pokémon to communicate with others.
                </li>
                <li>
                    <span className={Styles.keyword}>Battle Item </span>- item that increase a Pokémon's stats temporarily in battle.
                </li>
                <li>
                    <span className={Styles.keyword}>Medicine </span>- item that can heal various afflictions of a Pokémon. While originally part of the general Items pocket, it has had its own pocket since Generation IV.
                </li>
                <li>
                    <span className={Styles.keyword}>TMs &amp; HMs </span>- items which when used, teach compatible Pokémon a move, providing a wider movepool for Pokémon to learn from. Some moves will have additional uses outside of battle.
                </li>
                <li>
                    <span className={Styles.keyword}>Berries </span>- items introduced in Generation II that can be found and cultivated.
                </li>
                <li>
                    <span className={Styles.keyword}>Key Items </span>- items that generally can only be obtained once in gameplay and cannot be traded between games. Often these are items which the player must deliver to a non-player character, but other times they are intended to be kept and either aid the progression of the storyline or traveling.
                </li>
            </ul>
            <h5>Fling Effects</h5>
            <ul>
                <li><span className={Styles.keyword}>Badly Poison </span>- if held item is Toxic Orb, Fling will badly poison target</li>
                <li><span className={Styles.keyword}>Burn </span>- if held item is Flame Orb, Fling will burn the target</li>
                <li><span className={Styles.keyword}>Berry Effect </span>- immediately activates the berry's effect on the target</li>
                <li><span className={Styles.keyword}>Herb Effect </span>- immediately activates the herb's effect on the target</li>
                <li><span className={Styles.keyword}>Paralyze Effect </span>- if held item is Light Ball, Fling will paralyze the target</li>
                <li><span className={Styles.keyword}>Poison Effect </span>- if held item is Poison Barb, Fling will poison target</li>
                <li><span className={Styles.keyword}>Flinch Effect </span>- if held item is King's Rock or Razor Fang, Fling will cause target to flinch</li>
            </ul>
        </div>;
    }
}
