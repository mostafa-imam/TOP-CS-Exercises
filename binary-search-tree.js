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

  depth(value) {
    let current = this.root;
    let depth = 0;

    while (current !== null) {
      if (value === current.data) {
        return depth;
      }

      if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }

      depth++;
    }

    return undefined;
  }

  isBalanced() {
    const check = (node) => {
      if (node === null) return 0;

      const leftHeight = check(node.left);
      if (leftHeight === -1) return -1;

      const rightHeight = check(node.right);
      if (rightHeight === -1) return -1;

      if (Math.abs(leftHeight - rightHeight) > 1) {
        return -1;
      }

      return Math.max(leftHeight, rightHeight) + 1;
    };

    return check(this.root) !== -1;
  }

  rebalance() {
    const values = [];

    this.inOrderForEach((value) => values.push(value));

    this.root = this.#buildTree(values);
  }
}

function generateRandomArray(size = 15, max = 100) {
  const arr = [];

  while (arr.length < size) {
    const randomNum = Math.floor(Math.random() * max);
    if (!arr.includes(randomNum)) {
      arr.push(randomNum);
    }
  }

  return arr;
}

const randomNumbers = generateRandomArray();
const tree = new Tree(randomNumbers);
console.log("Is tree balanced?", tree.isBalanced());

function printTraversals(tree) {
  console.log("Level Order:");
  tree.levelOrderForEach((value) => console.log(value));

  console.log("Pre Order:");
  tree.preOrderForEach((value) => console.log(value));

  console.log("Post Order:");
  tree.postOrderForEach((value) => console.log(value));

  console.log("In Order:");
  tree.inOrderForEach((value) => console.log(value));
}

printTraversals(tree);

tree.insert(150);
tree.insert(200);
tree.insert(250);
tree.insert(300);
tree.insert(350);

console.log("Is tree balanced after inserts?", tree.isBalanced());
tree.rebalance();
console.log("Is tree balanced after rebalance?", tree.isBalanced());
printTraversals(tree);
