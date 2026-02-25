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
      throw new Error("A callback function is required");
    }

    if (this.root === null) return;

    const queue = [this.root];

    while (queue.length > 0) {
      const current = queue.shift();
      callback(current.data);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
  }

  inOrderForEach(callback) {
    if (!callback) {
      throw new Error("A callback function is required");
    }

    const traverse = (node) => {
      if (node === null) return;

      traverse(node.left);
      callback(node.data);
      traverse(node.right);
    };

    traverse(this.root);
  }

  preOrderForEach(callback) {
    if (!callback) {
      throw new Error("A callback function is required");
    }

    const traverse = (node) => {
      if (node === null) return;

      callback(node.data);
      traverse(node.left);
      traverse(node.right);
    };

    traverse(this.root);
  }

  postOrderForEach(callback) {
    if (!callback) {
      throw new Error("A callback function is required");
    }

    const traverse = (node) => {
      if (node === null) return;

      traverse(node.left);
      traverse(node.right);
      callback(node.data);
    };

    traverse(this.root);
  }

  height(value) {
    let current = this.root;

    while (current !== null) {
      if (value === current.data) break;

      if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    if (current === null) return undefined;

    const getHeight = (node) => {
      if (node === null) return -1;

      const leftHeight = getHeight(node.left);
      const rightHeight = getHeight(node.right);

      return Math.max(leftHeight, rightHeight) + 1;
    };

    return getHeight(current);
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

const tree = new Tree([1, 2, 3, 4, 5, 6, 7]);
prettyPrint(tree.root);

// const result = [];
// tree.inOrderForEach(v => result.push(v));
// console.log(result);
// tree.preOrderForEach((v) => result.push(v));
console.log(tree.height(789));
// tree.postOrderForEach(v => result.push(v));
// console.log(result);
