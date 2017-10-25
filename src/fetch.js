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
            const currentlyStored = loadStorage(this.__nam) || [];
            if (this.__nam === 'pokelist') {
                if (Array.isArray(currentlyStored)) {
                    this.setStorage(this.__nam, data);
                }
                return data;
            }
            const isDataStored = currentlyStored.find(el => el.id === data.id);
            if (!isDataStored) {
                currentlyStored.push(data);
                this.setStorage(this.__nam, currentlyStored);
            }
            if (this.__nam === 'pokemon' || this.__nam === 'type') {
                const local_moves = loadStorage('move') || [];
                moves.forEach(e => {
                    const move = local_moves.find(m => m.id === e.id);
                    if (!move) {
                        local_moves.push(e);
                    }
                });
                this.setStorage('move', local_moves);
                if (this.__nam === 'pokemon') {
                    for (let i in data.moves) {
                        if (i === 'level_up') {
                            data.moves[i] = data.moves[i].map(mov => {
                                const m = local_moves.find(el => el.id === mov.id);
                                return {
                                    ...m,
                                    ...mov,
                                }
                            });
                        } else {
                            data.moves[i] = data.moves[i].map(e => {
                                const move = local_moves.find(m => m.id === e);
                                if (!move) {
                                    console.warn(move, data, i);
                                }
                                return move;
                            });
                        }
                    }
                    const local_evo = loadStorage('evolution_chain') || [];
                    let evo = local_evo.find(el => el.id === data.evolution_chain);
                    if (!evo) {
                        if (!evolution) {
                            return null;
                        }
                        local_evo.push(evolution);
                        evo = evolution;
                        this.setStorage('evolution_chain', local_evo);
                    }
                    data.evolution_chain = evo;
                } else {
                    data.moves = data.moves.map(e => {
                        const move = moves.find(m => m.id === e);
                        if (!move) {
                            console.warn(move, data, e, 'TYPE');
                        }
                        return move;
                    });
                    const pokelist = loadStorage('pokelist');
                    data.pokemon = data.pokemon.map(e => {
                        return pokelist[e - 1];
                    });
                }
                return data;
            }
            if (data.hasOwnProperty('pokemon')) {
                const pokelist = loadStorage('pokelist');
                if (Array.isArray(data.pokemon)) {
                    data.pokemon = data.pokemon.map(e => pokelist[e]);
                } else {
                    for (let i in data.pokemon) {
                        data.pokemon[i] = data.pokemon[i].map(e => pokelist[e]);
                    }
                }
                return data;
            }
            return data;
        })
        .catch(e => {
            console.warn(e);
            return null;
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
        const storedData = loadStorage(type);
        if (storedData && type !== 'pokemon' && type !== 'type') {
            if (type === 'pokelist') {
                return Promise.resolve(storedData);
            }
            const match = storedData.find(e => e.id === id);
            if (match) {
                return this.fillData(match, type);
            }
            // return type === 'pokelist' ? Promise.resolve(storedData) : this.fillData(match, type);
        }
        if (storedData && (type === 'pokemon' || type === 'type')) {
            const match = storedData.find(e => e.id === id);
            const localMoves = loadStorage('move') || [];
            const localEvo = loadStorage('evolution_chain') || [];
            const moveIDs = localMoves.map(e => e.id);
            const evoIDs = localEvo.map(e => e.id);
            const isFetch = match ? this.isMoveFetchNeeded(match, moveIDs, evoIDs, type) : false;
            if (!isFetch && match) {
                return this.fillData(match, type, localMoves, localEvo);
            }
            storedMoves.push(...moveIDs);
            storedEvo.push(...evoIDs);
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

    fillData (item, type, mvs, evo) {
        const data = {...item};
        console.log('FILL DATA IN ACTION');
        if (type === 'pokemon') {
            for (let i in data.moves) {
                if (i === 'level_up') {
                    data.moves[i] = data.moves[i].map(e => {
                        const id = e.id;
                        const move = mvs.find(e => e.id === id);
                        return {
                            ...e,
                            ...move,
                        }
                    });
                } else {
                    data.moves[i] = data.moves[i].map(e => {
                        const move = mvs.find(m => m.id === e);
                        if (!move) {
                            console.warn(move, data, i);
                        }
                        return move;
                    });
                }
            }
            data.evolution_chain = evo.find(e => e.id === data.evolution_chain);
            console.log('@POKEMON', data);
            return Promise.resolve(data);
        }
        if (type === 'move') {
            const pokelist = loadStorage('pokelist');
            if (!data || !pokelist) {
                console.warn(data, pokelist, '@@ MOVE');
            }
            for (let i in data.pokemon) {
                data.pokemon[i] = data.pokemon[i].map(e => pokelist[e]);
            }
            return Promise.resolve(data);
        }
        if (data.hasOwnProperty('pokemon')) {
            const pokelist = loadStorage('pokelist');
            if (!pokelist || !data) {
                console.warn(move, data, '@@ OTHER');
            }
            if (Array.isArray(data.pokemon)) {
                data.pokemon = data.pokemon.map(e => pokelist[e]);
            } else {
                for (let i in data.pokemon) {
                    data.pokemon[i] = data.pokemon[i].map(e => pokelist[e]);
                }
            }
            if (type === 'type') {
                data.moves = data.moves.map(e => {
                    const move = mvs.find(m => m.id === e);
                    if (!move) {
                        console.warn('Missing move', data, e);
                    }
                    return move;
                });
            }
            return Promise.resolve(data);
        }

        return Promise.resolve(data);
    }

    isMoveFetchNeeded (data, moveIDs, evoIDs, type) {
        const has = [];
        const missing = [];
        const missingEvo = [];
        if (type === 'pokemon') {
            for (let i in data.moves) {
                data.moves[i].forEach(e => {
                    const id = e.id;
                    if (!has.includes(id)) {
                        has.push(id);
                    }
                });
            }
        } else {
            data.moves.forEach(e => {
                has.push(e);
            });
        }
        if (!evoIDs.includes(data.evolution_chain)) {
            missingEvo.push(data.evolution_chain);
        }
        has.forEach(e => {
            if (!moveIDs.includes(e)) {
                missing.push(e);
            }
        });
        return missing.length && missingEvo.length;
    }
}
