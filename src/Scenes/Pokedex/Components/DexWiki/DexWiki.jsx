import React from 'react';
import Styles from './DexWiki.scss';
import {
    WikiEvo,
    WikiExp,
    WikiItem,
    WikiPoke,
    WikiMove,
} from './Components';

const DexWiki = props => {
    switch (props.type) {
        case 'item':
            return <WikiItem />;
        case 'evolution':
            return <WikiEvo />;
        case 'experience':
            return <WikiExp />;
        case 'move':
            return <WikiMove />;
        default:
            return <WikiPoke />
    }
};

export default DexWiki
