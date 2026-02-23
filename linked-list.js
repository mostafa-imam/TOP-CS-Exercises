import { LinkedListNode } from "./linked-list-node.js";
export { LinkedList }

class LinkedList {

    constructor() {
        this.head = null;
    }

    append(value) {
        const node = new LinkedListNode();
        node.value = value;

        if (this.head === null) {
            this.head = node;
            return;
        }

        let temp = this.head;

        while (temp.nextNode !== null) {
            temp = temp.nextNode
        }

        temp.nextNode = node;
    }

    prepend(value) {
        const node = new LinkedListNode();
        node.value = value;

        if (this.head === null) {
            this.head = node;
            return;
        }

        let temp = this.head;
        this.head = node;
        this.head.nextNode = temp;
    }

    size() {
        let counter = 0;
        let temp = this.head;

        while (temp !== null) {
            counter++;
            temp = temp.nextNode;
        }

        return counter;
    }

    getHead() {
        if (this.head === null) {
            return undefined;
        };

        return this.head.value;
    }

    tail() {
        let temp = this.head;

        if (temp === null) {
            return undefined;
        }

        while (temp.nextNode !== null) {
            temp = temp.nextNode;
        }

        return temp.value;
    }

    at(index) {
        let counter = 0;
        let temp = this.head;

        while (temp !== null) {

            if (counter === index) {
                return temp.value;
            }

            counter++;

            temp = temp.nextNode;
        }

        return undefined;
    }

    pop() {
        if (this.head === null) {
            return undefined;
        }

        let value = this.head.value;
        let next = this.head.nextNode;
        this.head = next;
        return value;
    }

    contains(value) {
        let temp = this.head;

        while (temp !== null) {
            if (temp.value === value) {
                return true;
            }

            temp = temp.nextNode;
        }

        return false;
    }

    findIndex(value) {
        let temp = this.head;
        let counter = 0;

        while (temp !== null) {
            if (temp.value === value) {
                return counter;
            }
            counter++;
            temp = temp.nextNode;
        }

        return -1;
    }

    toString() {
        let temp = this.head;

        if (temp === null) return "";

        let returned = '';

        while (temp !== null) {
            returned = returned + this.formatNode(temp.value);
            temp = temp.nextNode;
        }

        return returned + 'null';
    }

    formatNode(value = '') {
        return `( ${value} ) -> `
    }

    insertAt(index, ...values) {

        if (index < 0 || index > this.size()) {
            throw new RangeError("This is a range error.")
        }

        if (index === 0) {
            values.reverse().forEach(v => this.prepend(v));
            return;
        }

        let temp = this.head;
        let counter = 0;

        while (temp !== null) {
            if (index - 1 === counter) {
                let tail = temp.nextNode;

                values.forEach(item => {
                    const node = new LinkedListNode();
                    node.value = item;
                    temp.nextNode = node;
                    temp = temp.nextNode;
                });

                temp.nextNode = tail;
                return;
            }

            counter++;
            temp = temp.nextNode;
        }
    }

    removeAt(index) {
        if (index < 0 || index >= this.size()) {
            throw new RangeError("This is a range error.")
        }

        if (index === 0) {
            this.head = this.head.nextNode;
            return;
        }

        let counter = 0;
        let temp = this.head;

        while (temp !== null) {
            if (index - 1 === counter) {
                temp.nextNode = temp.nextNode.nextNode;
                return;
            };

            counter++;
            temp = temp.nextNode;
        };
    }
}