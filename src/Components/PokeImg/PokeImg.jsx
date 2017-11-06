import React from 'react';
import Styles from './PokeImg.scss';

export default class PokeImg extends React.Component {
    shouldComponentUpdate (nextProps) {
        if (nextProps === this.props) {
            return false;
        }
        return true;
    }

    componentDidMount () {
        this.setSize();
        const image = new Image();
        const src = this.getSrc(this.props.id);
        image.src = src;
        const loaded = image.complete;
        if (loaded) {
            this.drawImage(image);
        } else {
            image.onload = () => {
                image.onload = undefined;
                this.drawImage(image);
            };
        }
    }

    setSize = () => {
        const gl = this.gl;
        const GL_WIDTH = gl.canvas.offsetWidth;
        const GL_HEIGHT = gl.canvas.offsetHeight;
        const GL_DIM = Math.max(GL_WIDTH, GL_HEIGHT);
        gl.canvas.height = GL_DIM * 1.5;
        gl.canvas.width = GL_DIM * 1.5;
    };

    drawImage = image => {
        const gl = this.gl;
        const GL_SIZE = gl.canvas.width;
        gl.translate(0.5, 0.5);
        gl.drawImage(image, 0, 0, GL_SIZE, GL_SIZE);
    };

    getContext = canvas => {
        if (canvas) {
            this.gl = canvas.getContext('2d');
            return;
        }
    };

    getSrc (id) {
        if (id > 649) {
            return './resources/icons/not_ready.svg';
        }
        const bundleID = ~~(id / 10);
        let pokeID = id.toString();
        if (pokeID.length === 1) {
            pokeID = `00${pokeID}`;
        } else if (pokeID.length === 2) {
            pokeID = `0${pokeID}`;
        }
        return `./resources/pokemon/pokemons_${bundleID}.svg#${pokeID}`;
    }

    render () {
        const { size = 'sm' } = this.props;
        return <canvas ref={this.getContext} className={Styles[size]}>
            Canvas Not Supprted
        </canvas>;
    }
}
