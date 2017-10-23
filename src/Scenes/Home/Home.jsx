import React from 'react';
import Styles from './Home.scss';

class Home extends React.Component {
    render () {
        return <div>
            <h5>Pokedex</h5>
            <p>
                Pokedex is a digital encyclopedia created by Profesor Oak to help trainers in Pokemon world. It gives information about all Pokemons that are contained in its database.
            </p>
            <p>
                Informations you can find here are simplified data published via <a className={Styles.link} href="https://pokeapi.co">PokeApi</a> and on <a className={Styles.link} href="https://bulbapedia.bulbagarden.net">Bulbapedia</a>
            </p>
            <h5>Important notice!</h5>
            <p>
                Evolution tree work is still in progress, what you see in many cases is just simplified reflection of data available on websites mentioned above.
            </p>
        </div>
    }
}

export default Home
