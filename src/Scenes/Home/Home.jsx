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
                    Informations you can find here are simplified data published via <a className={Styles.link} href="https://pokeapi.co">PokeApi</a> and on <a className={Styles.link} href="https://bulbapedia.bulbagarden.net">Bulbapedia</a>.
                </p>
            </div>
            <div className={Styles.section}>
                <h5>Important notice!</h5>
                <p>
                    Evolution tree is still not completed, in some cases what you see is a simplified reflection of data available on websties mentioned above. Also many icons and images are missing.
                </p>
            </div>
        </div>
    }
}

export default Home
