import React from 'react';
import Styles from './WikiEvo.scss';

const WikiEvo = props => {
    return <div>
        <div className={Styles.section}>
            <h5>Evolution Methods</h5>
            <div className={Styles.paragraph}>
                <span className={Styles.keyword}>Level up </span>
                - method of evolution when it is required for pokemon to reach certain level to evolve. There are also pokemon that has to fit other conditions besides reaching required level to evolve.
                <br/>Those conditions are: high friendship, knowing certain move, training in certain area, certain day time, holding an item, being certain gender.
            </div>
            <div className={Styles.paragraph}>
                <span className={Styles.keyword}>Via Trading </span>
                - a few pokemon can only evolve when they are traded. The evolution starts immediately after the trade is completed, regardless of the method of the trading used.
            </div>
            <div className={Styles.paragraph}>
                <span className={Styles.keyword}>Evolutionary Stone </span>
                - some pokemon evolve when they are exposed to an evolutionary stone. The stone may be applied at any time and causes an instant evolution. The player can decide whether and when to evolve his or her Pokémon, but he or she must choose carefully as most Pokémon will no longer be able to learn certain moves when they evolve in this way.
            </div>
        </div>
        <div className={Styles.section}>
            <h5>Evolution Locations</h5>
            <div className={Styles.paragraph}>
                <span className={Styles.keyword}>Mossy Rock </span>
                - a special rock that enables Eevee to evolve into Leafeon when leveled up nearby. Mossy Rocks are located in Eterna Forest (Sinnoh), Pinwheel Forest (Unova), Route 20 (Kalos).
            </div>
            <div className={Styles.paragraph}>
                <span className={Styles.keyword}>Icy Rock </span>
                - a special rock that enables Eevee to evolve into Glaceon when leveled up nearby. Icy Rocks are located in Twist Mountain (Unova), Route-117 (Sinnoh), Frost Cavern (Kalos).
            </div>
            <div className={Styles.paragraph}>
                <span className={Styles.keyword}>Magnetic Field </span>
                - enables Magneton, Nosepass evolte into Magnezone and Probopass respectively. Magnetic Field is located in Mt. Coronet (Sinnoh), Chargestone Cave (Unova), Route-13 (Kalos).
            </div>
        </div>
    </div>;
};

export default WikiEvo
