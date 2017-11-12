import React from 'react';
import Styles from './WikiPoke.scss';
import { PokeLink } from 'Components';

const WikiPoke = props => {
    return <div>
        <div className={Styles.section}>
            <h5>Pokemon Statistics</h5>
            <div className={Styles.paragraph}>
                <span className={Styles.keyword}>HP (Hit Points) </span>
                - determines how much damage a Pokemon can receive before fainting.
            </div>
            <div className={Styles.paragraph}>
                <span className={Styles.keyword}>Attack </span>
                - determines how much damage a Pokemon deals when using a physical move.
            </div>
            <div className={Styles.paragraph}>
                <span className={Styles.keyword}>Defense </span>
                - partly determines how much damage a Pokemon receives when it is hit with physical move.
            </div>
            <div className={Styles.paragraph}>
                <span className={Styles.keyword}>Special Attack </span>
                - determines how much damage a Pokemon deals when usin a special move.
            </div>
            <div className={Styles.paragraph}>
                <span className={Styles.keyword}>Special Defense </span>
                - partly determines how much damage a Pokemon receives when it is hit with special move.
            </div>
            <div className={Styles.paragraph}>
                <span className={Styles.keyword}>Speed </span>
                - determines the order of Pokemon that cant act in battle. Pokemon with higher Speed at the start of any turn will generally make a move before ones with lower speed.
            </div>
        </div>
        <div className={Styles.section}>
            <h5>Pokemon Information</h5>
            <div className={Styles.paragraph}>
                <span className={Styles.keyword}>Catch Rate </span>
                - Each species of Pokémon has a catch rate that applies to all its members. Higher catch rates mean that the Pokémon is easier to catch, up to a maximum of 255. When a Poké Ball is thrown at a wild Pokémon, the game uses that Pokémon's catch rate in a formula to determine the chances of catching that Pokémon.
                <span className={Styles.sub}>
                    The formula takes into account the following factors (on this site base PokeBall is used):
                </span>
                <ul>
                    <li>The health of the Pokémon (relative to its full health)</li>
                    <li>The type of Poké Ball</li>
                    <li>Any status condition of the wild Pokémon</li>
                    <li>Any active Pass Powers (in Generation V) or O-Power (in Generation VI)</li>
                </ul>
            </div>
            <div className={Styles.paragraph}>
                <span className={Styles.keyword}>Base Experience </span>
                - the amount of experience a newly-obtained Pokemon has on their level, as newly-obtained Pokemon have no experience gained to make it to the next level.
            </div>
            <div className={Styles.paragraph}>
                <span className={Styles.keyword}>Growth rate </span>
                - determines curve of  amount of experience required to Pokemon to reach higher level. Which is amount of experience that Pokemon needs to gain in order to reach 100 level. See: <span className={Styles.inline}><PokeLink id="experience" type="wiki" name="Experience" /></span>.
            </div>
            <div className={Styles.paragraph}>
                <span className={Styles.keyword}>Egg groups </span>
                - categories that determine which Pokemon are able to interbreed. This concept was introduced in Generation II. Similar to types, a Pokemon may belong to either one or two Egg groups.
            </div>
            <div className={Styles.paragraph}>
                <span className={Styles.keyword}>Gender </span>
                - a concept introduced in Generation II, though touched upon in Generation I. In Gold and Silver Versions, most species of Pokémon were assigned a gender, male or female however, the genders of some species of Pokémon were left unknown. This feature allowed for Pokémon breeding, as well as introducing the concept of a Pokémon Egg to the series. <span className={Styles.sub}>
                    Gender makes no difference in the stats of a Pokémon after Generation II, unless the two Pokémon are a different species entirely, such as Nidoran.
                </span>
            </div>
            <div className={Styles.paragraph}>
                <span className={Styles.keyword}>Egg cycles </span>
                - determines how long an egg takes to hatch. One egg cycle is 256 steps. For example if hatching takes 15 egg cycles then a total of 3840 steps will cause an egg to hatch.
            </div>
            <div className={Styles.paragraph}>
                <span className={Styles.keyword}>Abilities </span>
                - provides a passive effect in battle or in the overworld. Individual Pokemon may have only one Ability at a time.
            </div>
            <div className={Styles.paragraph}>
                <span className={Styles.keyword}>Evolution </span>
                - it is a process in which a Pokémon changes into a different species of Pokémon. This change is not merely visual, however, as Pokémon of a higher evolutionary stage have different (and usually more powerful) base stats than their predecessors, may have different moves that can be learned, and sometimes change their types, though usually at least one of the types of the previous form is preserved. See: <span className={Styles.inline}><PokeLink id="evolution" type="wiki" name="Evolution" /></span>.
            </div>
        </div>
    </div>;
}

export default WikiPoke
