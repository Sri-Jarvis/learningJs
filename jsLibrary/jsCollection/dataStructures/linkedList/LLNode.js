export default class LLNode {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
        console.log("in LLNode constructor");
    }

    toString(callback) {
        return callback ? callback(this.value) : `${this.value}`;
    }
}