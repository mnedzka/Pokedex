import React from 'react';
import Styles from './DexWiki.scss';
import {
    WikiEvo,
    WikiExp,
    WikiItem,
    WikiPoke,
} from './Components';

const DexGlossary = props => {
    switch (props.type) {
        case 'item':
            return <WikiItem />;
        case 'evolution':
            return <WikiEvo />;
        case 'experience':
            return <WikiExp />;
        default:
            return <WikiPoke />
    }
};

export default DexGlossary
