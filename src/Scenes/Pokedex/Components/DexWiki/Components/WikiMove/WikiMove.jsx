import React from 'react';
import Styles from './WikiMove.scss';

const WikiMove = props => {
    return <div>
        <div className={Styles.section}>
            <h5>Move Statistics</h5>
            <div className={Styles.paragraph}>
                <span className={Styles.keyword}>Power </span>
                - moves with more power inflict more damage, provided all other circumstances are equal. Many variables besides power can influence the damage a move deals, however.
                <span className={Styles.sub}>
                    Statistically speaking, stronger moves often have certain limitations over weaker moves, such as low accuracy, low PP, or a negative effect like recoil damage.
                </span>
                <span className={Styles.sub}>
                    Since Generation II, the power of a move is always displayed in the move section of a Pokémon's summary screen. Most physical and special moves display a numeric value for their power (in some multiple of 5), but there exceptions: Moves that deal direct damage display a power of "-".
                </span>
            </div>
            <div className={Styles.paragraph}>
                <span className={Styles.keyword}>PP </span>
                - Power Points have existed in every generation. It costs 1 PP to use a move (barring the influence of the Pressure Ability), so the PP a move has remaining is essentially equivalent to the number of times that move can be used. Each move is assigned a base Power Point value that is either 1 or a positive multiple of 5, up to 40.
                <span className={Styles.sub}>
                    In general, weaker moves learned at lower levels will have higher PP, while more powerful moves or moves learned at higher levels will have lower PP. PP can be fully restored by healing one's Pokémon at a Pokémon Center, and effectively act as a method to encourage players to use them even if they take little or no damage.
                </span>
            </div>
            <div className={Styles.paragraph}>
                <span className={Styles.keyword}>Accuracy </span>
                -  an aspect of moves that, in conjunction with the user's in-battle accuracy stat and the target's evasion stat, determines how reliable they can hit their target. Although the concept was introduced in Generation I, a move's accuracy was not displayed until Generation III.
                <span className={Styles.sub}>
                    A move's accuracy can be any number from 1-100, reflecting the probability of the move being successful as a percentage (if neither accuracy nor evasion are modified in-battle). Currently, however, only multiples of 5 between 30 and 100 (inclusive) are used.
                </span>
                <span className={Styles.sub}>
                    Many moves have an accuracy of "—", indicating that they are exempt from regular accuracy calculations. Oftentimes, these moves affect no one but the user (and/or the partner in a Double Battle), or are simply intended to be moves that cannot miss (unless the target has used a move that grants it semi-invulnerability for a turn such as Fly).
                </span>
            </div>
            <div className={Styles.paragraph}>
                <span className={Styles.keyword}>Priority </span>
                - is a characteristic of moves, such that any move with a higher priority than another will always be performed first. When two moves have the same priority, the users' Speed statistics will determine which one is performed first in a battle.
            </div>
            <div className={Styles.paragraph}>
                <span className={Styles.keyword}>Effect </span>
                -  is the in-battle secondary effect of a damaging move. Additional effects include stat changes or status conditions with a chance of occurring. Some moves can also have more than one additional effect; Ice Fang is an example of this, with a 10% chance of freezing the target and an independent 10% chance of causing the target to flinch.
            </div>
            <div className={Styles.paragraph}>
                <span className={Styles.keyword}>TM </span>
                - item that enables Pokemon to learn specific move.
            </div>
        </div>
        <div className={Styles.section}>
            <h5>Move Damage Class</h5>
            <div className={Styles.paragraph}>
                <span className={Styles.keyword}>Physical </span>
                - is one of the three categories of moves and one of the two that inflict damage. Physical moves deal damage depending on both the Attack stat of the attacking Pokémon and the Defense stat of the defending Pokémon. <br />
                There are also a small number of special moves introduced in Generation V that are said to deal physical damage; although these moves are classified as special moves, they too deal damage based on the defending Pokémon's Defense stat (as opposed to its Special Defense). <br />
                While most physical moves make contact, some do not. For example, Earthquake does not make contact despite being a physical move.
            </div>
            <div className={Styles.paragraph}>
                <span className={Styles.keyword}>Special </span>
                - is one of the three categories of moves and one of the two that inflict damage. In Generation I, special moves cause damage depending on the Special stats of both the attacking Pokémon and the defending Pokémon. In later generations, special moves typically deal damage depending on the Special Attack stat of the attacking Pokémon and the Special Defense stat of the defending Pokémon. However, a small number of special moves introduced in Generation V actually deal physical damage, with their damage calculation being dependent on the defending Pokémon's Defense instead of its Special Defense stat. <br />
                While most special moves do not make contact, some do. For example, Grass Knot makes contact despite being a special move.
            </div>
            <div className={Styles.paragraph}>
                <span className={Styles.keyword}>Status </span>
                - is one of the three categories of moves and the only one that does not inflict damage. In Pokémon Mystery Dungeon: Explorers of Time, Darkness, and Sky, status moves are referred to as Other. <br />
                Status moves include moves that change the weather, inflict status conditions, or raise or lower the stats of a Pokémon, among other effects.
            </div>
        </div>
        <div className={Styles.section}>
            <h5>Move Learn Methods</h5>
            <div className={Styles.paragraph}>
                <span className={Styles.keyword}>Level Up </span>
                - Pokemon can learn given move after reaching specified level.
            </div>
            <div className={Styles.paragraph}>
                <span className={Styles.keyword}>Breeding </span>
                -  moves obtained by a Pokémon when hatching, rules are as follows:
                <ul>
                    <li>
                        By default, the baby Pokémon will start with any moves that it learns at level 1. (In Generation II and Generation III, they will know all moves that are level 5 and below in their learnset.)
                    </li>
                    <li>
                        If both parents know a move that the baby can learn via leveling up, the Pokémon will inherit that move.
                    </li>
                    <li>
                        Prior to Generation VI, if the father knows any moves that are TMs or HMs in that game (and in Crystal, moves that are taught by a Move Tutor) that the baby is also compatible with, it will inherit the move. If a genderless Pokémon breeds with Ditto, the resultant baby will inherit any compatible TM or HM moves that the genderless non-Ditto Pokémon parent knows.
                    </li>
                    <li>
                        If the father or, starting in Generation VI, the mother knows any specific Egg Moves that the baby can learn, the baby will inherit the move.
                    </li>
                    <li>
                        From Pokémon Emerald onward, if either parent is holding a Light Ball, a bred Pichu will know Volt Tackle. Volt Tackle cannot be passed down as a normal Egg Move.
                    </li>
                </ul>
                <span className={Styles.sub}>
                    If this would result in the baby possessing more than four moves, the moves take priority in the order listed: Volt Tackle, mother's Egg Moves, father's Egg Moves, TM and HM moves, inherited level-up moves, baby's default moveset. The moves passed down will be ordered on the baby Pokémon by the priority listed above.
                </span>
            </div>
            <div className={Styles.paragraph}>
                <span className={Styles.keyword}>TM/HM </span>
                -  TM is an item that, like an HM, is used to teach a Pokémon a move. A TM is a machine used by Pokémon Trainers to teach a Pokémon a new move that it might not learn otherwise. Prior to Generation V, TMs were single-use items, unlike Hidden Machines, which can be used over and over again on many different Pokémon. TMs can be found on the ground or bought at department stores. Some are also given away by Gym Leaders as prizes for defeating them in addition to a Badge.
                <span className={Styles.sub}>
                    HM for short, is an item that, like a TM, is used to teach a Pokémon a move. HMs can be used an unlimited number of times and cannot be disposed of. Moves taught by HMs cannot normally be forgotten.
                </span>
            </div>
            <div className={Styles.paragraph}>
                <span className={Styles.keyword}>Tutoring </span>
                - moves learned by a Move Tutor. Move Tutor is a non-player character who will teach a Pokémon specific moves.
            </div>
        </div>
    </div>;
};

export default WikiMove
