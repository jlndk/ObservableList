export class ObservableList extends Array {
    /**
     * Create a new ObservableList.
     *
     * @param {Iterable|undefined} value a iterable collection of values the list should be initialized with.
     */
    constructor(value) {
        if(Symbol.iterator in Object(value)){
            super(...value);
        } else {
            super();
        }
        this.subscribers = [];
    }

    /**
     * Register a new subscriber for this list.
     * Each time the list is updated it will be notified via the supplied callback.
     *
     * @return {Function} A "unsubscribe" function which will undo the subscription once called.
     */
    subscribe(handler, invalidate = function(){}) {
        const subscriber = {handler, invalidate};
        this.subscribers.push(subscriber);

        handler(this);
        return () => {
            const i = this.subscribers.indexOf(subscriber);
            if (i !== -1) {
                this.subscribers.splice(i, 1);
            }
        };
    }

    /**
     * Replaces all items in this list with the content of a given iterable collection of other items.
     *
     * @param  {Iterable} items An iterable collection of the items which this list should contain.
     */
    replaceAll(items) {
        //Make sure the list is emptied (in case items is empty)
        this.length = 0;
        this.splice(0, items.length, ...items);
        this._invalidate();
    }

    /**
     * Accepts a callback which modifies the list.
     *
     * @param  {Function} callback A function, which is given the current and must return a list (optionally modified).
     */
    update(callback) {
        const newList = callback(this);
        this.replaceAll(newList);
    }

    /**
     * Should return the data (as an object or array) which should be serialized.
     * Can be overridden by a subclass if it contains other values that should be persisted.
     *
     * @return {Object} The data which should be serialized
     */
    _serialize() {
        return this;
    }

    /**
     * Is called when the list is unserialized.
     * This function will repopulate the list with serialized values.
     * Can be overridden by a subclass if it contains other values that should has been persisted (see _serialize).
     *
     * @param  {Object} data The unserialized data.
     */
    _unserialize(data) {
        this.replaceAll(data);
    }

    /**
     * Sets a given key to a given value.
     * Should not really be called outside
     *
     * @param {String} prop  The name of the key which is being updated
     * @param {[type]} value The new value for the given key.
     */
    _set(prop, value) {
        this[prop] = value;

        this._invalidate();
    }

    /**
     * Informs all subscribers that the data has been updated
     */
    _invalidate() {
        this.subscribers.forEach((s) => s.invalidate());
        this.subscribers.forEach((s) => s.handler(this));
    }

    /**
     * Returns a string representation of this list.
     * @return {String} A string representation of this list.
     */
    toString() {
        return JSON.stringify(this._serialize());
    }
}

class ListProxy {
    set(obj, prop, value) {
        if(typeof obj._set !== "function") {
            throw new Error(`Method _set(prop, value) is not defined on '${obj.constructor.name}'`);
        }

        obj._set(prop, value);
        return true;
    }
}

export function observe(list) {
    return new Proxy(list, new ListProxy());
}

export function list(items) {
    return observe(new ObservableList(items));
}

export function persist(list, name) {
    let prevData = localStorage.getItem(name);
    if(prevData !== null) {
        list._unserialize(JSON.parse(prevData));
    }
    list.subscribe(value => {
        localStorage.setItem(name, JSON.stringify(value._serialize()));
    });
    return list;
}
