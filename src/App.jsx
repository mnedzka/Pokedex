import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Scenes/Home/Home.jsx';
import Pokedex from './Scenes/Pokedex/Pokedex.jsx';
import Pokelist from './Scenes/Pokelist/Pokelist.jsx';
import Layout from './Scenes/Layout/Layout.jsx';

class App extends React.Component {
    render () {
        return <Layout>
            <Home />
            <Pokedex />
            <Pokelist />
        </Layout>;
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#app')
);
