import { Node } from "./binary-search-tree-node.js";
import { mergeSort } from "./merge-sort.js";

class Tree {
    constructor(array) {
        this.root = this.#buildTree(array);
    }

    #buildTree(array) {
        const arr = this.#removeDuplicates(array);

        return this.#sortedArrayToBSTRecur(arr, 0, arr.length - 1)
    }

    #sortedArrayToBSTRecur(array, start, end) {

        if (start > end) return null;

        const mid = start + Math.floor((end - start) / 2);

        let root = new Node(array[mid]);

        root.left = this.#sortedArrayToBSTRecur(array, start, mid - 1);
        root.right = this.#sortedArrayToBSTRecur(array, mid + 1, end);

        return root;
    }

    #removeDuplicates(array) {

        const arr = mergeSort(array);

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === arr[i + 1]) {
                arr.splice(i, 1);
                i--;
            }
        }

        return arr;
    }

}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null || node === undefined) {
        return;
    }

    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(tree.root);