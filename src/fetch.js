const loadStorage = itemName => {
    const check = localStorage.getItem(itemName);
    let res = false;
    try {
        const obj = JSON.parse(check);
        if (obj && typeof obj === 'object') {
            res = obj;
        }
    } catch (e) {
        console.info('JSON stored data invalid');
    }
    return res;
}

class FetchWrapper {
    constructor (url, options, name) {
        this.__isAborted = false;
        this.__url = url,
        this.__opt = options || {};
        this.__nam = name;
        this.__id = Math.floor(Math.random() * 1000000000);
    }

    abort () {
        this.__isAborted = true;
    }

    get () {
        return fetch(this.__url, this.__opt)
        .then(r => {
            if (this.__isAborted || !r.ok) {
                throw new Error('Abort/Failure');
            }
            return r.json();
        })
        .then(d => {
            window.__fetchlist.rm(this.__id);
            const {data, moves, evolution} = d;
            const localData = loadStorage(this.__nam) || [];
            if (this.__nam === 'pokelist' || this.__nam === 'pokedex') {
                if (Array.isArray(localData)) this.setStorage(this.__nam, data);
                return data;
            }
            const isStored = localData.find(e => e.id === data.id);
            if (!isStored) {
                localData.push(data);
                this.setStorage(this.__nam, localData);
            }
            if (data.hasOwnProperty('moves')) {
                const localMoves = loadStorage('move') || [];
                moves.forEach(m => {
                    if (!localMoves.find(e => e.id === m.id)) {
                        localMoves.push(m);
                    }
                });
                this.setStorage('move', localMoves);
                if (Array.isArray(data.moves)) {
                    data.moves = data.moves.map(m => localMoves.find(e => e.id === m));
                } else {
                    for (let i in data.moves) {
                        data.moves[i] = data.moves[i].map(m => {
                            if (typeof m === 'number') {
                                return localMoves.find(e => e.id === m);
                            }
                            return {
                                ...localMoves.find(e => e.id === m.id),
                                ...m,
                            };
                        });
                    }
                }
            }
            if (data.hasOwnProperty('pokemon')) {
                const localPoke = loadStorage('pokelist');
                if (Array.isArray(data.pokemon)) {
                    data.pokemon = data.pokemon.map(p => localPoke[p]);
                } else {
                    for (let i in data.pokemon) {
                        data.pokemon[i] = data.pokemon[i].map(p => localPoke[p]);
                    }
                }
            }
            if (data.hasOwnProperty('evolution_chain')) {
                const localEvo = loadStorage('evolution_chain') || [];
                let evo = localEvo.find(e => e.id === data.evolution_chain);
                if (!evo) {
                    localEvo.push(evolution);
                    evo = evolution;
                    this.setStorage('evolution_chain', localEvo);
                }
                data.evolution_chain = evo;
            }
            return data;
        })
        .catch(e => {
            if (this.__isAborted) {
                return null;
            }
            console.warn(e);
            return;
        });
    }

    setStorage (itemName, data) {
        try {
            localStorage.setItem(itemName, JSON.stringify(data));
        } catch (e) {
            console.warn(e);
        }
    }
}

export default class PokeCache {
    get (reqBody = {}) {
        const {type = 'pokelist', id = 0, storedMoves = [], storedEvo = []} = reqBody;
        console.log(reqBody);
        window.xxx ? window.xxx++ : window.xxx = 0;
        if (window.xxx) return;
        const storedData = loadStorage(type);
        if (storedData && (type === 'pokelist' || type === 'pokedex')) {
            return Promise.resolve(storedData);
        }
        const match = storedData ? storedData.find(e => e.id === id) : false;
        const needsMoves = ['type', 'pokemon'].includes(type);
        if (match && !needsMoves) {
            return this.collectData(match);
        }
        if (needsMoves) {
            const localMoves = loadStorage('move') || [];
            const localEvo = loadStorage('evolution_chain') || [];
            const localMoveId = localMoves.map(e => e.id);
            const localEvoId = localEvo.map(e => e.id);
            if (match) {
                const missData = this.isDataMissing(match, localMoveId, localEvoId);
                if (!missData) {
                    return this.collectData(match, localMoves, localEvo)
                }
            }
            storedMoves.push(...localMoveId);
            storedEvo.push(...localEvoId);
        }
        const url = 'https://us-central1-pokedex-182809.cloudfunctions.net/dex';
        const rbody = {
            type : type,
            id : id,
            storedMoves : storedMoves,
            storedEvo : storedEvo,
        }
        const opt = {
            method : 'POST',
            body : JSON.stringify(rbody),
        };
        console.log('### REQ BODY -> ', opt);
        return this.__fetchData(url, opt, type);
    }

    __fetchData (url, options, itemName) {
        const f = new FetchWrapper(url, options, itemName);
        window.__fetchlist.ad(f);
        return f.get();
    }

    setStorage (itemName, data) {
        try {
            localStorage.setItem(itemName, JSON.stringify(data));
        } catch (e) {
            console.warn(e);
        }
    }

    collectData (data, localMoves, localEvo) {
        if (data.hasOwnProperty('pokemon')) {
            const localPoke = loadStorage('pokelist');
            if (Array.isArray(data.pokemon)) {
                data.pokemon = data.pokemon.map(poke => localPoke[poke]);
            } else {
                for (let i in data.pokemon) {
                    data.pokemon[i] = data.pokemon[i].map(poke => localPoke[poke]);
                }
            }
        }
        if (data.hasOwnProperty('moves')) {
            if (Array.isArray(data.moves)) {
                data.moves = data.moves.map(mov => localMoves.find(el => el.id === mov));
            } else {
                for (let i in data.moves) {
                    data.moves[i] = data.moves[i].map(m => {
                        if (typeof m === 'number') {
                            return localMoves.find(el => el.id === m);
                        }
                        return {
                            ...localMoves.find(el => el.id === m.id),
                            ...m,
                        };
                    });
                }
            }
        }
        if (data.hasOwnProperty('evolution_chain')) {
            data.evolution_chain = localEvo.find(ev => ev.id === data.evolution_chain);
        }
        return Promise.resolve(data);
    }

    isDataMissing (data, moveIDs, evoIDs) {
        const missing = [];
        const missingEvo = [];
        if (data.hasOwnProperty('evolution_chain') && !evoIDs.includes(data.evolution_chain)) {
            missingEvo.push(data.evolution_chain);
        }
        if (Array.isArray(data.moves)) {
            data.moves.forEach(m => {
                if (!moveIDs.includes(m)) missing.push(m);
            });
            return missing.length || missingEvo.length;
        }
        for (let i in data.moves) {
            data.moves[i].forEach(m => {
                if (typeof m === 'number') {
                    if (!moveIDs.includes(m)) missing.push(m);
                } else {
                    if (!moveIDs.includes(m.id)) missing.push(m.id);
                }
            });
        }
        return missing.length || missingEvo.length;
    }
}
