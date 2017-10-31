import React from 'react';
import Styles from './PokeEvo.scss';
import {
    PokeImg,
    PokeLink,
} from 'Components';
import {
    formatName,
} from 'src/utils.js';

const getEvolutions = (chain, arr) => {
    const allEvoArr = [];
    const mapEvolutions = (evoChain, arrToPush, i) => {
        const id = evoChain.species.id;
        arrToPush.push({
            index : i,
            id : id,
            name : evoChain.species.name,
            details : evoChain.evolution_details,
        });
        evoChain.evolves_to.map(evolvesTo => {
            mapEvolutions(evolvesTo, allEvoArr, i + 1);
        });
    };
    mapEvolutions(chain, allEvoArr, 0);
    let evolutions = [];
    allEvoArr.forEach(evo => {
        const i = evo.index;
        const step = evolutions[i] ? evolutions[i] : [];
        step.push(evo);
        evolutions[i] = step;
    });
    return evolutions;
}

const mapEvoDetails = details => {
    if (!details) return null;
    const detailArr = [];
    if (details.trigger === 'trade') {
        detailArr.push(<div key="trade">Trade</div>);
    }
    if (details.min_level) {
        detailArr.push(<div key="lvl">Lvl: {details.min_level}</div>);
    }
    if (details.min_beauty) {
        detailArr.push(<div key="beauty">Beauty: {details.min_beauty}</div>);
    }
    if (details.time_of_day.length) {
        detailArr.push(<div key="time">
            {formatName(details.time_of_day)}
        </div>);
    }
    if (details.gender) {
        detailArr.push(<div key="gender">{details.gender === 2 ? '♂' : '♀'}</div>);
    }
    if (details.relative_physical_stats !== null) {
        switch (details.relative_physical_stats) {
            case 0:
                detailArr.push(<div key="phys">Att = Def</div>);
                break;
            case 1:
                detailArr.push(<div key="phys">Att &gt; Def</div>);
                break;
            default:
                detailArr.push(<div key="phys">Att &lt; Def</div>);
        }
    }
    if (details.needs_overworld_rain) {
        detailArr.push(<div key="rain">Rain in overworld</div>);
    }
    if (details.turn_upside_down) {
        detailArr.push(<div key="turn">Turn upside down</div>);
    }
    if (details.item) {
        const id = details.item.id;
        const name = formatName(details.item.name);
        detailArr.push(<div key="item">
            Use <PokeLink id={id} name={name} type="item" />
        </div>);
    }
    if (details.known_move_type) {
        const id = details.known_move_type.id;
        const name = formatName(details.known_move_type.name);
        detailArr.push(<div key="moveType">
            Knows <PokeLink id={id} name={name} type="type" /> move
        </div>);
    }
    if (details.min_affection) {
        detailArr.push(<div key="affection">
            Affection: {details.min_affection}
        </div>);
    }
    if (details.party_type) {
        const id = details.party_type.id;
        const name = formatName(details.party_type.name);
        detailArr.push(<div key="partyType">
            With <PokeLink id={id} name={name} type="type" /> pokemon in party.
        </div>);
    }
    if (details.trade_species) {
        const id = details.trade_species.id;
        const name = formatName(details.trade_species.name);
        detailArr.push(<div key="tradeSpec">
            For <PokeLink id={id} name={name} type="pokemon" />
        </div>);
    }
    if (details.party_species) {
        const id = details.party_species.id;
        const name = formatName(details.party_species.name);
        detailArr.push(<div key="partySpec">
            With <PokeLink id={id} name={name} type="pokemon" /> in party
        </div>);
    }
    if (details.min_happiness) {
        detailArr.push(<div key="happiness">Happiness: {details.min_happiness}</div>);
    }
    if (details.held_item) {
        const id = details.held_item.id;
        const name = formatName(details.held_item.name);
        detailArr.push(<div key="heldItem">
            Has <PokeLink id={id} name={name} type="item" />
        </div>);
    }
    if (details.known_move) {
        const id = details.known_move.id;
        const name = formatName(details.known_move.name);
        detailArr.push(<div key="move">
            Knows <PokeLink id={id} name={name} type="move" />
        </div>);
    }
    if (details.location) {
        const name = formatName(details.location);
        detailArr.push(<div key="location">
            Near <PokeLink id="evolution" name={name} type="wiki" />
        </div>);
    }
    return <div key={details} className={Styles.details}>
        {detailArr}
    </div>;
};

const parseEvo = (evolutions, id) => {
    return evolutions.map((evo, i) => {
        return <div key={i} className={Styles.row}>{
            evo.map(poke => {
                let details = i ? <div className={Styles.arrow}>{mapEvoDetails(poke.details)}</div> : null;
                let pokeImg = <PokeLink name={poke.name} id={poke.id} type="pokemon" role="evolution">
                    <PokeImg id={poke.id} />
                </PokeLink>;
                if (id === poke.id) {
                    pokeImg = <PokeImg id={poke.id} />;
                }
                return <div className={Styles.item} key={poke.id}>
                    {details}
                    {pokeImg}
                </div>
            })
        }</div>
    });
};

const PokeEvo = props => {
    const {chain, id} = props.data;
    if (props.id > 802) return null;
    const evolutions = getEvolutions(chain, evolutions);
    if (evolutions.length < 2) return null;
    console.log(evolutions);
    return <div className={Styles.evolution}>
        {parseEvo(evolutions, props.id)}
    </div>;
}

export default PokeEvo
