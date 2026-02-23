import { Node, LinkedList } from "./hash-map-linked-list.js";

export { HashMap };

class HashMap {
    constructor() {
        this.capacity = 16;
        this.loadFactor = 0.75;
        this.size = 0;
        this.buckets = new Array(this.capacity).fill(undefined);
    }

    hash(key) {
        if (typeof key !== "string") {
            throw new TypeError("Keys must be strings");
        }

        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode = hashCode % this.capacity;
        }

        return hashCode;
    }

    set(key, value) {
        const hash = this.hash(key);

        if (this.buckets[hash] === undefined) {
            const node = new Node();
            node.key = key;
            node.value = value;

            this.buckets[hash] = new LinkedList();
            this.buckets[hash].head = node;
            this.size++;
            this.grow();
            return;
        }

        let temp = this.buckets[hash].head;

        while (temp !== null) {
            if (temp.key === key) {
                temp.value = value;
                return;
            }

            if (temp.nextNode === null) {
                const node = new Node();
                node.key = key;
                node.value = value;

                temp.nextNode = node;
                this.size++;
                this.grow();
                return;
            }

            temp = temp.nextNode;
        }
    }

    get(key) {
        const hash = this.hash(key);
        const bucket = this.buckets[hash];

        if (bucket === undefined) {
            return null;
        }

        let temp = bucket.head;

        while (temp !== null) {
            if (temp.key === key) {
                return temp.value;
            }

            temp = temp.nextNode;
        }

        return null;
    }

    has(key) {
        const hash = this.hash(key);
        const bucket = this.buckets[hash];

        if (bucket === undefined) {
            return false;
        }

        let temp = bucket.head;

        while (temp !== null) {
            if (temp.key === key) {
                return true;
            }

            temp = temp.nextNode;
        }
        return false;
    }

    remove(key) {
        const hash = this.hash(key);
        const bucket = this.buckets[hash];

        if (bucket === undefined || bucket.head === null) return false;

        if (bucket.head.key === key) {
            bucket.head = bucket.head.nextNode;
            this.size--;
            return true;
        }

        let temp = bucket.head;

        while (temp.nextNode !== null) {
            if (temp.nextNode.key === key) {
                temp.nextNode = temp.nextNode.nextNode;
                this.size--;
                return true;
            }

            temp = temp.nextNode;
        }

        return false;
    }

    length() {
        return this.size;
    }

    clear() {
        this.buckets = new Array(this.capacity).fill(undefined);
        this.size = 0;
    }

    keys() {
        let arr = [];
        const buckets = this.buckets;

        buckets.forEach((item) => {
            if (!item || item.head === null) return;

            let temp = item.head;

            while (temp !== null) {
                arr.push(temp.key);
                temp = temp.nextNode;
            }
        });

        return arr;
    }

    values() {
        let arr = [];
        const buckets = this.buckets;

        buckets.forEach((item) => {
            if (!item || item.head === null) return;

            let temp = item.head;

            while (temp !== null) {
                arr.push(temp.value);
                temp = temp.nextNode;
            }
        });

        return arr;
    }

    entries() {
        let arr = [];
        const buckets = this.buckets;

        buckets.forEach((item) => {
            if (!item || item.head === null) return;

            let temp = item.head;

            while (temp !== null) {
                arr.push([temp.key, temp.value]);
                temp = temp.nextNode;
            }
        });

        return arr;
    }

    grow() {
        if (this.length() > this.capacity * this.loadFactor) {
            let oldEntries = this.entries();

            this.capacity = this.capacity * 2;
            this.buckets = new Array(this.capacity).fill(undefined);

            oldEntries.forEach((item) => {
                this.#setWithoutGrowth(item[0], item[1]);
            });
        }
    }

    #setWithoutGrowth(key, value) {
        const hash = this.hash(key);

        if (this.buckets[hash] === undefined) {
            const node = new Node();
            node.key = key;
            node.value = value;

            this.buckets[hash] = new LinkedList();
            this.buckets[hash].head = node;
            this.size++;
            return;
        }

        let temp = this.buckets[hash].head;

        while (temp !== null) {
            if (temp.key === key) {
                temp.value = value;
                return;
            }

            if (temp.nextNode === null) {
                const node = new Node();
                node.key = key;
                node.value = value;

                temp.nextNode = node;
                this.size++;
                return;
            }

            temp = temp.nextNode;
        }
    }
}