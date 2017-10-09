export default class Poke_fetch {
    constructor (item = false) {
        this.cache = {};
        this.storageItem = item;

        this.get = (url) => {
            if (this.storageItem) {
                this.loadStorage();
            }
            if (url in this.cache) {
                return Promise.resolve(this.cache[url]);
            }
            return this.__fetchData(url);
        };
    }

    __fetchData (url) {
        return fetch(url).then(resp => resp.json());
    }

    loadStorage () {
        const check = localStorage.getItem(this.storageItem);
        if (check) {
            try {
                const obj = JSON.parse(check);
                if (obj && typeof obj === 'object') {
                    this.cache = obj;
                }
            } catch (e) {
                console.info('Data item present, JSON invalid. String may have had exceed memory limit.');
            }
        }
    }

    setStorage (data) {
        try {
            localStorage.setItem(this.storageItem, JSON.stringify(data));
        } catch (e) {
            console.warn(e);
        }
    }

    clearCache () {
        this.cache = {};
    }

    finishBatch (data) {
        this.setStorage(data);
        this.clearCache();
    }
}
