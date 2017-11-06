import React from 'react';
import Styles from './WikiExp.scss';

export default class WikiExp extends React.Component {
    render () {
        return <div className={Styles.section}>
        <h5>Experience</h5>
        <p>
            <span className={Styles.keyword}>Experience Points </span>
            - indication of how much Pokemon has battled. After a certain amount of experience points pokemon will grow up to level 100. In the core series games, experience is normally gained by all Pokemon who have been sent out against an opponent's Pokemon, divided evenly among them.
        </p>
        <p>
            <span className={Styles.keyword}>Growth Rate </span>
            - the amount of experience points a Pokémon has is tied directly to its level. Though the amount varies depending on species, always remaining consistent throughout an evolutionary family, a given amount of experience points will always set a Pokémon at the corresponding level. Wild Pokémon of any level will always have the base amount of experience required to reach that level when caught, as will Pokémon hatched from Eggs. All Pokémon fall into one of six experience groups. The main difference between these experience groups is the amount of experience points required to reach level 100, and thus, the amount required to reach each level.
        </p>
        <h5>Growth Rate Groups</h5>
        <ul>
            <li>
                <span className={Styles.keyword}>Erratic </span>- one of the two groups introduced in Generation III, features the lowest level 100 value for experience, at only 600,000 points. Receiving its name due to the highly erratic experience point requirement to reach the next level from level 68 to level 98, Pokémon in this group level up rather slowly in their lower levels.
            </li>
            <li>
                <span className={Styles.keyword}>Fast </span>- one of the four experience groups introduced in Generation I, with 800,000 experience points making for a level 100 Pokémon. Many Normal- and Fairy-type Pokémon are in this group.
            </li>
            <li>
                <span className={Styles.keyword}>Medium Fast </span>- most plentiful experience group is the Medium Fast group, which was also introduced in Generation I. Requiring Pokémon to have an even 1,000,000 experience points to be at level 100.
            </li>
            <li>
                <span className={Styles.keyword}>Medium Slow </span>- accounts for many Pokémon, containing the second largest amount of them. This group also contains all of the starter Pokémon trios. Requiring 1,059,860 experience points for a Pokémon to reach level 100.
            </li>
            <li>
                <span className={Styles.keyword}>Slow </span>- features the highest amount of experience required for a Pokémon to reach level 100 in Generations I and II, and the second highest amount since then. Containing many rare, powerful, and Legendary Pokémon, Pokémon in this group are typically very hard to raise; all pseudo-legendary Pokémon, by definition, are in this experience group. At level 100, a Pokémon in this experience group will have 1,250,000 experience points.</li>
            <li>
                <span className={Styles.keyword}>Fluctuating </span>- introduced in Generation III and a direct opposite to the Erratic group, the Fluctuating experience group contains the Pokémon which grow the slowest of all, reaching level 100 with a whopping 1,640,000 experience points. It is also, unsurprisingly, the smallest of the experience groups, containing only 14 species. </li>
        </ul>
    </div>;
    }
}
