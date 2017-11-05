class Storage {
    loadStorage (itemName) {
        const check = localStorage.getItem(itemName);
        let data = false;
        try {
            const obj = JSON.parse(check);
            if (obj && typeof obj === 'object') {
                data = obj;
            }
        } catch (e) {
            console.warn('JSON stored data invalid. Storage item will be removed');
            localStorage.removeItem(itemName);
        }
        return data;
    }

    setStorage (itemName, data) {
        try {
            localStorage.setItem(itemName, JSON.stringify(data));
        } catch (e) {
            console.warn(e);
        }
    }
}

class FetchWrapper extends Storage {
    constructor (url, options, name, reqID) {
        super();
        this.__isAborted = false;
        this.__url = url,
        this.__opt = options || {};
        this.__nam = name;
        this.__id = Math.floor(Math.random() * 1000000000);
        this.__reqID = reqID;
    }

    abort () {
        this.__isAborted = true;
    }

    get () {
        return fetch(this.__url, this.__opt)
        .then(r => {
            window.__fetchlist.rm(this.__id);
            if (!r.ok) {
                throw new Error('Fetch Aborted');
            }
            return r.json();
        })
        .then(resp => {
            const { data, moves, evolution } = resp;
            const localData = this.loadStorage(this.__nam) || [];
            if (this.__nam === 'pokelist' || this.__nam === 'pokedex') {
                if (Array.isArray(localData)) {
                    this.setStorage(this.__nam, data);
                }
                if (this.__isAborted) {
                    throw new Error('Fetch Aborted');
                }
                return data;
            }
            const isStored = localData.find(el => el.id === data.id);
            if (!isStored) {
                localData.push(data);
                this.setStorage(this.__nam, localData);
            }
            if (data.hasOwnProperty('moves')) {
                const localMoves = this.loadStorage('move') || [];
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
                const localPokelist = this.loadStorage('pokelist');
                if (Array.isArray(data.pokemon)) {
                    data.pokemon = data.pokemon.map(p => localPokelist[p]);
                } else {
                    for (let i in data.pokemon) {
                        data.pokemon[i] = data.pokemon[i].map(p => localPokelist[p]);
                    }
                }
            }
            if (data.hasOwnProperty('evolution_chain')) {
                const localEvoChain = this.loadStorage('evolution_chain') || [];
                let evoChain = localEvoChain.find(e => e.id === data.evolution_chain);
                if (!evoChain) {
                    localEvoChain.push(evolution);
                    evoChain = evolution;
                    this.setStorage('evolution_chain', localEvoChain);
                }
                data.evolution_chain = evoChain;
            }
            if (this.__isAborted) {
                throw new Error('Fetch Aborted');
            }
            return data;
        })
        .catch(e => {
            if (this.__isAborted) {
                return null;
            }
            window.__fetchlist.rm(this.__id);
            return console.warn(e);
        });
    }
}

export default class PokeCache extends Storage {
    get (reqBody = {}, reqID) {
        const {type = 'pokelist', id = 0, storedMoves = [], storedEvo = []} = reqBody;
        __log('Requested Resource', reqBody, 'green');
        const isFetchAlive = window.__fetchlist.has(reqID);
        if (isFetchAlive) {
            return Promise.resolve(null);
        }
        const storedData = this.loadStorage(type);
        if (storedData && (type === 'pokelist' || type === 'pokedex')) {
            return Promise.resolve(storedData);
        }
        const match = storedData ? storedData.find(e => e.id === id) : false;
        const needsMoves = ['type', 'pokemon'].includes(type);
        if (match && !needsMoves) {
            return this.collectData(match);
        }
        if (needsMoves) {
            const localMoves = this.loadStorage('move') || [];
            const localEvo = this.loadStorage('evolution_chain') || [];
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
        const options = {
            method : 'POST',
            body : JSON.stringify({
                type,
                id,
                storedMoves,
                storedEvo,
            }),
        };
        __log('Request Body', options, 'purple');
        return this.__fetchData(url, options, type, reqID);
    }

    __fetchData (url, options, resourceName, reqID) {
        const f = new FetchWrapper(url, options, resourceName, reqID);
        window.__fetchlist.ad(f);
        return f.get();
    }

    collectData (data, localMoves, localEvo) {
        if (data.hasOwnProperty('pokemon')) {
            const localPoke = this.loadStorage('pokelist');
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
