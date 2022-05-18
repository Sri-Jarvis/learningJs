import LLNode from '../LLNode.js';
// const LLNode = require('../LLNode.js')

describe('LinkedListNode', () => {
    it('Should create list node with value', () => {
        const node = new LLNode(1);

        expect(node.value).toBe(1);
        expect(node.next).toBeNull();
    });
})
