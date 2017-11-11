import React from 'react';
import Styles from './WikiPoke.scss';

const WikiPoke = props => {
    return <div>
        <div className={Styles.section}>
            <h5>Move</h5>
            <p>
                <span className={Styles.keyword}>Damage Class </span>
                - determines kind of damage a given move deals. Damage calculation is performed using user's Attack and target's Defense (Physical) or user's Special Attack and target's Special Defense (Special). There is also Status move category, which does not inflicts damage.
            </p>
            <p>
                <span className={Styles.keyword}>Power </span>
                - base damage of given move.
            </p>
            <p>
                <span className={Styles.keyword}>PP (Power Point) </span>
                - determines the amount of times that move can be used. Base usage of PP per move is 1.
            </p>
            <p>
                <span className={Styles.keyword}>Accuracy </span>
                - a move's accuracy can be any number from 1-100, reflecting the probability of move being successful as a procentage. Currently only multiplies of 5 between 30 and 100 (inclusive) are used.
            </p>
            <p>
                <span className={Styles.keyword}>Priority </span>
                - characteristic of a move, such that any move with a higher priority than another will always be performed first. When two moves have the same priority, the user's Speed statistics will determine which one is performed first in battle.
            </p>
            <p>
                <span className={Styles.keyword}>TM (Technical Machine) </span>
                - is an item, that is used to teach a Pokemon a move.
            </p>
        </div>
        <div className={Styles.section}>
            <h5>Pokemon</h5>
            <p>
                <span className={Styles.keyword}>HP (Hit Points) </span>
                - determines how much damage a Pokemon can receive before fainting.
            </p>
            <p>
                <span className={Styles.keyword}>Attack </span>
                - determines how much damage a Pokemon deals when using a physical move.
            </p>
            <p>
                <span className={Styles.keyword}>Defense </span>
                - partly determines how much damage a Pokemon receives when it is hit with physical move.
            </p>
            <p>
                <span className={Styles.keyword}>Special Attack </span>
                - determines how much damage a Pokemon deals when usin a special move.
            </p>
            <p>
                <span className={Styles.keyword}>Special Defense </span>
                - partly determines how much damage a Pokemon receives when it is hit with special move.
            </p>
            <p>
                <span className={Styles.keyword}>Speed determines </span>
                - the order of Pokemon that cant act in battle. Pokemon with higher Speed at the start of any turn will generally make a move before ones with lower speed.
            </p>
            <p>
                <span className={Styles.keyword}>Egg groups </span>
                - categories that determine which Pokemon are able to interbreed. This concept was introduced in Generation II. Similar to types, a Pokemon may belong to either one or two Egg groups.
            </p>
            <p>
                <span className={Styles.keyword}>Abilities </span>
                - provides a passive effect in battle or in the overworld. Individual Pokemon may have only one Ability at a time.
            </p>
            <p>
                <span className={Styles.keyword}>Growth rate </span>
                - determines curve of  amount of experience required to Pokemon to reach higher level. Which is amount of experience that Pokemon needs to gain in order to reach 100 level.
            </p>
            <p>
                <span className={Styles.keyword}>Egg cycles </span>
                - determines how long an egg takes to hatch. One egg cycle is 256 steps. For example if hatching takes 15 egg cycles then a total of 3840 steps will cause an egg to hatch.
            </p>
        </div>
    </div>;
}

export default WikiPoke
