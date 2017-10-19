import React from 'react';

export default class DexGlossary extends React.Component {
    render () {
        return <div>
            <h5>Glossary</h5>
            <p>
                Damage Class - determines kind of damage a given move deals. Damage calculation is performed using user's Attack and target's Defense (Physical) or user's Special Attack and target's Special Defense (Special). There is also Status move category, which does not inflicts damage.
            </p>
            <p>
                Power - base damage of given move.
            </p>
            <p>
                PP (Power Point) - determines the amount of times that move can be used. Base usage of PP per move is 1.
            </p>
            <p>
                Accuracy - a move's accuracy can be any number from 1-100, reflecting the probability of move being successful as a procentage. Currently only multiplies of 5 between 30 and 100 (inclusive) are used.
            </p>
            <p>
                Priority - characteristic of a move, such that any move with a higher priority than another will always be performed first. When two moves have the same priority, the user's Speed statistics will determine which one is performed first in battle.
            </p>
            <p>
                TM (Technical Machine) - is an item, that is used to teach a Pokemon a move.
            </p>
        </div>;
    }
}
