// const loadStorage = itemName => {
//     const check = localStorage.getItem(itemName);
//     let res = false;
//     try {
//         const obj = JSON.parse(check);
//         if (obj && typeof obj === 'object') {
//             res = obj;
//         }
//     } catch (e) {
//         console.info('JSON stored data invalid');
//     }
//     return res;
// }

// class FetchWrapper {
//     constructor (url, options, name) {
//         this.__isAborted = false;
//         this.__url = url,
//         this.__opt = options || {};
//         this.__nam = name;
//         this.__id = Math.floor(Math.random() * 1000000000);
//     }

//     abort () {
//         this.__isAborted = true;
//     }

//     get () {
//         return fetch(this.__url, this.__opt)
//         .then(r => {
//             if (this.__isAborted || !r.ok) {
//                 throw new Error('Abort/Failure');
//             }
//             return r.json();
//         })
//         .then(d => {
//             if (this.__nam === 'pokelist') {
//                 this.setStorage(this.__nam, d);
//             } else {
//                 const curr = loadStorage(this.__nam);
//                 if (curr) {
//                     const next = [...curr];
//                     next.push(d);
//                     this.setStorage(this.__nam, next);
//                 } else {
//                     this.setStorage(this.__nam, [d]);
//                 }
//             }
//             window.__fetchlist.rm(this.__id);
//             return d;
//         })
//         .catch(e => {
//             console.warn(e);
//             return null;
//         });
//     }

//     setStorage (itemName, data) {
//         try {
//             localStorage.setItem(itemName, JSON.stringify(data));
//         } catch (e) {
//             console.warn(e);
//         }
//     }
// }

// export default class PokeCache {
//     get (reqBody) {
//         const {type, id} = reqBody.message;
//         const url = 'https://us-central1-pokedex-182809.cloudfunctions.net/dex';
//         const opt = {
//             method : 'POST',
//             body : JSON.stringify(reqBody),
//         };
//         console.log('### REQ BODY -> ', opt);
//         const storedData = loadStorage(type);
//         if (storedData) {
//             if (type === 'pokelist') {
//                 return Promise.resolve(storedData);
//             }
//             const match = storedData.find(e => e.id === id);
//             if (match) {
//                 return Promise.resolve(match);
//             }
//         }
//         return this.__fetchData(url, opt, type);
//     }

//     __fetchData (url, options, itemName) {
//         const f = new FetchWrapper(url, options, itemName);
//         window.__fetchlist.ad(f);
//         return f.get();
//     }
// }


// UPDATE
// UPDATE
// UPDATE
// UPDATE


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
            const currentlyStored = loadStorage(this.__nam) || [];
            const isThere = currentlyStored.find(e => e.id === d[0].id);
            if (!isThere) {
                currentlyStored.push(d[0]);
                this.setStorage(this.__nam, currentlyStored);
            }
            if (this.__nam === 'pokelist') {
                return d[0];
            }

            if (this.__nam === 'pokemon' || this.__nam === 'type') {
                const moves = loadStorage('move') || [];
                d[1].forEach(e => {
                    const move = moves.find(m => m.id === e.id);
                    if (!move) {
                        moves.push(e);
                    }
                });
                this.setStorage('move', moves);
                const data = {...d[0]};
                if (this.__nam === 'pokemon') {
                    for (let i in data.moves) {
                        data.moves[i] = data.moves[i].map(e => {
                            const move = moves.find(m => m.id === e.id);
                            if (!move) {
                                console.warn(move, data, i);
                            }
                            return {
                                ...move,
                                ...e,
                            }
                        });
                    }
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
            if (this.__nam === 'move') {
                const move = {...d[0]};
                const pokelist = loadStorage('pokelist');
                if (!move || !pokelist) {
                    console.warn(move, pokelist, '@@ MOVE');
                }
                for (let i in move.pokemon) {
                    move.pokemon[i] = move.pokemon[i].map(e => {
                        return {
                            ...pokelist[e - 1],
                        }
                    });
                }
                return move;
            }

            if (d[0].hasOwnProperty('pokemon')) {
                const data = {...d[0]};
                const pokelist = loadStorage('pokelist');
                if (pokelist || data) {
                    console.warn( data, '@@ OTHER');
                }
                data.pokemon = data.pokemon.map(e => pokelist[e - 1]);
                return data;
            }

            return d[0];
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
        const {type = 'pokelist', id = 0, stored = []} = reqBody;
        const storedData = loadStorage(type) || [];
        const match = storedData.find(e => e.id === id);
        if (storedData && type !== 'pokemon' && type !== 'type') {
            if (type === 'pokelist') {
                return Promise.resolve(storedData);
            }
            if (match) {
                return this.fillData(match, type);
            }
        }
        if (type === 'pokemon' || type === 'type') {
            const storedMoves = loadStorage('move') || [];
            const move_ids = storedMoves.map(e => e.id);
            const isFetch = this.isMoveFetchNeeded(match, move_ids, type);
            if (!isFetch && match) {
                return this.fillData(match, type, storedMoves);
            }
            stored.push(...move_ids);
        }
        const url = 'https://us-central1-pokedex-182809.cloudfunctions.net/dex';
        const rbody = {
            type : type,
            id : id,
            stored : stored,
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

    fillData (item, type, mvs) {
        const data = {...item};
        console.log('FILL DATA IN ACTION');
        if (type === 'pokemon') {
            for (let i in data.moves) {
                data.moves[i] = data.moves[i].map(e => {
                    const id = e.id;
                    const move = mvs.find(e => e.id === id);
                    return {
                        ...e,
                        ...move,
                    }
                });
            }
            console.log('@POKEMON', data);
            return Promise.resolve(data);
        }
        if (type === 'move') {
            const pokelist = loadStorage('pokelist');
            if (!data || !pokelist) {
                console.warn(data, pokelist, '@@ MOVE');
            }
            for (let i in data.pokemon) {
                data.pokemon[i] = data.pokemon[i].map(e => {
                    return {
                        ...pokelist[e - 1],
                    }
                });
            }
            return Promise.resolve(data);
        }
        if (data.hasOwnProperty('pokemon')) {
            const pokelist = loadStorage('pokelist');
            if (!pokelist || !data) {
                console.warn(move, data, '@@ OTHER');
            }
            data.pokemon = data.pokemon.map(e => {
                return pokelist[e - 1]
            });
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

    isMoveFetchNeeded (data, moveIDs, type) {
        const has = [];
        const missing = [];
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
                if (!has.includes(e)) {
                    has.push(e);
                }
            });
        }
        has.forEach(e => {
            if (!moveIDs.includes(e)) {
                missing.push(e);
            }
        });
        return missing.length;
    }
}
