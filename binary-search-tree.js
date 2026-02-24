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
tree.insert(99);
prettyPrint(tree.root);
