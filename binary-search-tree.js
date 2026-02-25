import { Node } from "./binary-search-tree-node.js";
import { mergeSort } from "./merge-sort.js";

class Tree {
    constructor(array) {
        this.root = this.#buildTree(array);
    }

    #buildTree(array) {
        const arr = this.#removeDuplicates(array);

        return this.#sortedArrayToBSTRecur(arr, 0, arr.length - 1);
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

    includes(value) {
        let current = this.root;

        while (current !== null) {
            if (current.data === value) return true;
            if (value < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        return false;
    }

    insert(value) {
        this.root = this.#insertRec(this.root, value);
    }

    #insertRec(root, value) {
        if (root === null) return new Node(value);

        if (value < root.data) {
            root.left = this.#insertRec(root.left, value);
        } else if (value > root.data) {
            root.right = this.#insertRec(root.right, value);
        }

        return root;
    }

    deleteItem(value) {
        return this.#deleteItemRecursive(this.root, value);
    }

    #getSuccessor(current) {
        current = current.right;
        while (current !== null && current.left !== null) {
            current = current.left;
        }
        return current;
    }

    #deleteItemRecursive(root, value) {
        if (root === null) {
            return root;
        }

        if (root.data > value) {
            root.left = this.#deleteItemRecursive(root.left, value);
        } else if (root.data < value) {
            root.right = this.#deleteItemRecursive(root.right, value);
        } else {
            if (root.left === null) {
                return root.right;
            }
            if (root.right === null) {
                return root.left;
            }

            const succ = this.#getSuccessor(root);
            root.data = succ.data;
            root.right = this.#deleteItemRecursive(root.right, succ.data);
        }
        return root;
    }

    levelOrderForEach(callback) {
        if (!callback) {
            throw new Error("A callback function is required")
        }

        if (this.root === null) return;

        const queue = [this.root];

        while (queue.length > 0) {
            const current = queue.shift();
            callback(current.data)
            if (current.left) queue.push(current.left);
            if (current.right) queue.push(current.right);
        }
    }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null || node === undefined) {
        return;
    }

    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
// console.log(tree.root);
// console.log(tree.includes(67));
// tree.insert(100);
// tree.insert(6);
// prettyPrint(tree.root);
// tree.insert(7);
// tree.insert(99);
// tree.deleteItem(8);
prettyPrint(tree.root);
tree.levelOrderForEach((item) => {
    console.log(item);

})