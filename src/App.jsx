import React from 'react';
import { connect } from 'react-redux';
import Home from 'Scenes/Home/Home.jsx';
import Pokedex from 'Scenes/Pokedex/Pokedex.jsx';
import Pokelist from 'Scenes/Pokelist/Pokelist.jsx';
import Layout from 'Scenes/Layout/Layout.jsx';

class App extends React.Component {
    render () {
        const page = this.props.page;
        let Content = null;
        let title = null;

        switch (page) {
            case 'pokemonlist':
                Content = Pokelist;
                title = 'Pokemon List';
                break;
            case 'pokedex':
                Content = Pokedex;
                title = 'Pokedex';
                break;
            default:
                Content = Home;
                title = 'Home';
        }

        return <Layout title={title}>
            <Content />
        </Layout>;
    }
}

const mapStateToProps = state => {
    return {
        page : state.page.currentPage,
    };
};

export default connect(mapStateToProps)(App)
