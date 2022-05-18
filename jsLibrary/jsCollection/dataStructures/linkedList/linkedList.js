import LLNode from './LLNode.js';
import Comparator from "../../comparator/comparator.js";

class linkedList {
    constructor(comparatorFunction) {
        this.head = null;
        this.tail = null;
        this.compare = new Comparator(comparatorFunction);
    }

    prepend(value) {
        const newNode = new LLNode(value, this.head);
        this.head = newNode;
        if (!this.tail) {
            this.tail = newNode;
        }

        return this;
    }

    append(value) {
        const newNode = new LLNode(value);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;

            return this;
        }
        this.tail.next = newNode;
        this.tail = newNode;

        return this;
    }

    insert(value, rawIndex) {
        const index = rawIndex < 0 ? 0 : rawIndex;
        if (index === 0) {
            this.prepend(value);
        } else {
            let count = 1;
            let currNode = this.head;
            const newNode = new LLNode(value);
            while (currNode) {
                if (count === index)
                    break;
                currNode = currNode.next;
                count += 1;
            }
            if (currNode) {
                newNode.next = currNode.next;
                currNode.next = newNode;
            } else {
                if (this.tail) {
                    this.tail.next = newNode;
                    this.tail = newNode;
                } else {
                    this.head = newNode;
                    this.tail = newNode;
                }
            }
        }
        return this;
    }

    delete(value) {
        if (!this.head) {
            return null;
        }
        let deletedNode = null;

        while (this.head && this.compare.equal(this.head.value, value)) {
            deletedNode = this.head;
            this.head = this.head.next;
        }

        let currNode = this.head;

        if (currNode !== null) {
            while (currNode.next) {
                if (this.compare.equal(currNode.next.value, value)) {
                    deletedNode = currNode.value;
                    currNode.next = currNode.next.next;
                } else {
                    currNode = currNode.next;
                }
            }
        }
        if (this.compare.equal(this.tail.value, value)) {
            this.tail = currNode;
        }
        return deletedNode;
    }

    find({value = undefined, callback = undefined}) {
        if (!this.head) {
            return null;
        }
        let currNode = this.head;
        while (currNode) {
            if (callback && callback(currNode.value)) {
                return currNode;
            }
            if (value !== undefined && this.compare.equal(currNode.value, value)) {
                return currNode;
            }
            currNode = currNode.next;
        }

        return null;
    }

    deleteTail() {
        const deletedTail = this.tail;
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;

            return deletedTail;
        }

        let currNode = this.head;
        while (currNode.next) {
            if (!currNode.next.next) {
                currNode.next = null;
            } else {
                currNode = currNode.next;
            }
        }
        this.tail = currNode;

        return deletedTail;
    }

    deleteHead() {
        if (!this.head) {
            return null;
        }
        const deletedHead = this.head;
        if (this.head.next) {
            this.head = this.head.next;
        } else {
            this.head = null;
            this.tail = null;
        }

        return deletedHead;
    }

    fromArray(values) {
        values.forEach(value => this.append(value));

        return this;
    }

    toArray() {
        const list = [];
        let currNode = this.head;
        while (currNode) {
            list.push(currNode);
            currNode = currNode.next;
        }

        return list;
    }

    toString(callback) {
        return this.toArray().map(node => node.toString(callback)).toString();
    }

    reverse() {
        let currNode = this.head;
        let prevNode = null;
        let nextNode = null;

        while (currNode) {
            nextNode = currNode.next;
            currNode.next = prevNode;
            prevNode = currNode;
            currNode = nextNode;
        }
        this.tail = this.head;
        this.head = prevNode;

        return this;
    }
}