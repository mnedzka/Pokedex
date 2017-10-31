import React from 'react';
import Styles from './DexWiki.scss';
import {
    WikiEvo,
    WikiExp,
    WikiItem,
    WikiPoke,
} from './Components';

export default class DexGlossary extends React.Component {
    render () {
        switch (this.props.type) {
            case 'item':
                return <WikiItem />;
            case 'evolution':
                return <WikiEvo />;
            case 'experience':
                return <WikiExp />;
            default:
                return <WikiPoke />
        }
    }
}
