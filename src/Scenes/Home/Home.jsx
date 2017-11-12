import React from 'react';
import Styles from './Home.scss';

class Home extends React.Component {
    render () {
        return <div>
            <div className={Styles.section}>
                <h5>Pokedex</h5>
                <p>
                    Pokedex is a digital encyclopedia created by Profesor Oak to help trainers in Pokemon world. It gives information about all Pokemons that are contained in its database.
                </p>
                <p>
                    Informations you can find here have been published via <a className={Styles.link} href="https://pokeapi.co">PokeApi</a> and on <a className={Styles.link} href="https://bulbapedia.bulbagarden.net">Bulbapedia</a>.
                </p>
            </div>
            <div className={Styles.section}>
                <h5>Important notice!</h5>
                <p>
                    Images of Pokemons from 6th to 7th generation and images of all items are missing.
                </p>
            </div>
        </div>
    }
}

export default Home
