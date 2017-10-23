import React from 'react';
import Styles from './PokeEvo.scss';
import PokeImg from 'Components/PokeImg/PokeImg.jsx';
import PokeLink from 'Components/PokeLink/PokeLink.jsx';

const getEvolutions = (chain, arr) => {
    const allEvoArr = [];
    const mapEvolutions = (evoChain, arrToPush, i) => {
        const id = ~~evoChain.species.url.match(/\/(\d+)\//)[1];
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
    return details.map((d, i) => {
        const detailsArray = [];
        if (d.trigger.name === 'trade') {
            detailsArray.push(<div key="trade">Trade</div>);
        }
        if (d.min_level) {
            detailsArray.push(<div key="lvl">Lvl: {d.min_level}</div>);
        }
        if (d.min_beauty) {
            detailsArray.push(<div key="beauty">Beauty: {d.min_beauty}</div>);
        }
        if (d.time_of_day.length) {
            detailsArray.push(<div key="time">
                {d.time_of_day.replace(/\b(\w)/g, m => m.toUpperCase())}
            </div>);
        }
        if (d.gender) {
            detailsArray.push(<div key="gender">{d.gender === 2 ? '♂' : '♀'}</div>);
        }
        if (d.relative_physical_stats !== null) {
            switch (d.relative_physical_stats) {
                case 0:
                    detailsArray.push(<div key="phys">Att = Def</div>);
                    break;
                case 1:
                    detailsArray.push(<div key="phys">Att &gt; Def</div>);
                    break;
                default:
                    detailsArray.push(<div key="phys">Att &lt; Def</div>);
            }
        }
        if (d.needs_overworld_rain) {
            detailsArray.push(<div key="rain">Rain in overworld</div>);
        }
        if (d.turn_upside_down) {
            detailsArray.push(<div key="turn">Turn upside down</div>);
        }
        if (d.item) {
            const id = ~~d.item.url.match(/\/(\d+)\//)[1];
            const name = d.item.name.replace(/\b(\w)/g, m => m.toUpperCase());
            detailsArray.push(<div key="item">
                Use <PokeLink id={id} name={name} type="item" />
            </div>);
        }
        if (d.known_move_type) {
            detailsArray.push(<div key="moveType">
                Knows <PokeLink id={18} name="Fairy" type="type" /> move
            </div>);
        }
        if (d.min_affection) {
            detailsArray.push(<div key="affection">
                Affection: {d.min_affection}
            </div>);
        }
        if (d.party_type) {
            const id = ~~d.party_type.url.match(/\/(\d+)\//)[1];
            const name = d.party_type.name.replace(/\b(\w)/g, m => m.toUpperCase());
            detailsArray.push(<div key="partyType">
                With <PokeLink id={id} name={name} type="type" /> pokemon in party.
            </div>);
        }
        if (d.trade_species) {
            const id = ~~d.trade_species.url.match(/\/(\d+)\//)[1];
            const name = d.trade_species.name.replace(/\b(\w)/g, m => m.toUpperCase());
            detailsArray.push(<div key="tradeSpec">
                For <PokeLink id={id} name={name} type="pokemon" />
            </div>);
        }
        if (d.party_species) {
            const id = ~~d.party_species.url.match(/\/(\d+)\//)[1];
            const name = d.party_species.name.replace(/\b(\w)/g, m => m.toUpperCase());
            detailsArray.push(<div key="partySpec">
                With <PokeLink id={id} name={name} type="pokemon" /> in party
            </div>);
        }
        if (d.min_happiness) {
            detailsArray.push(<div key="happiness">Happiness: {d.min_happiness}</div>);
        }
        if (d.held_item) {
            const id = ~~d.held_item.url.match(/\/(\d+)\//)[1];
            const name = d.held_item.name.replace(/\b(\w)/g, m => m.toUpperCase());
            detailsArray.push(<div key="heldItem">
                Has <PokeLink id={id} name={name} type="item" />
            </div>);
        }
        if (d.known_move) {
            const id = ~~d.known_move.url.match(/\/(\d+)\//)[1];
            const name = d.known_move.name.replace(/\b(\w)/g, m => m.toUpperCase());
            detailsArray.push(<div key="move">
                Knows <PokeLink id={id} name={name} type="move" />
            </div>);
        }
        if (d.location) {
            const name = d.location.name.replace(/\b(\w)/g, m => m.toUpperCase());
            detailsArray.push(<div key="location">
                Near <PokeLink id={0} name={name} type="glossary" />
            </div>);
        }
        return <div key={i} className={Styles.details}>
            {detailsArray}
        </div>;
    });
};

const parseEvo = (evolutions, id) => {
    return evolutions.map((evo, i) => {
        return <div key={i} className={Styles.row}>{
            evo.map(poke => {
                let details = i ? <div className={Styles.arrow}>{mapEvoDetails(poke.details)}</div> : null;
                let pokeImg = <PokeLink id={poke.id} type="pokemon">
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
    const {chain} = props.data;
    const evolutions = getEvolutions(chain, evolutions);
    console.log(evolutions);
    return <div>
        {parseEvo(evolutions, props.id)}
    </div>;
}

export default PokeEvo
