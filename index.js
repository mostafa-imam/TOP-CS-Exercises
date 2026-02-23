import { LinkedList } from "./linked-list.js";
import { HashMap } from "./hash-map.js";
import { mergeSort } from "./merge-sort.js"

/* linked list tests */
// const list = new LinkedList();
// 
// list.append("dog");
// list.append("cat");
// list.append("parrot");
// list.append("hamster");
// list.append("snake");
// list.append("turtle");
// list.prepend("hippo");
// 
// console.log(`Linked List Size: ${list.size()}`);
// console.log(`Head of Linked List: ${list.getHead()}`);
// console.log(`Tail of Linked List: ${list.tail()}`);
// console.log(`Linked List Items: ${list.toString()}`);

/* hash map Tests */
// const test = new HashMap();
// 
// test.set("apple", "red");
// test.set("banana", "yellow");
// test.set("carrot", "orange");
// test.set("dog", "brown");
// test.set("elephant", "gray");
// test.set("frog", "green");
// test.set("grape", "purple");
// test.set("hat", "black");
// test.set("ice cream", "white");
// test.set("jacket", "blue");
// test.set("kite", "pink");
// test.set("lion", "golden");
// console.log(test.capacity);
// console.log(test.buckets);
// 
// console.log("----------------------------------");
// 
// test.set("moon", "silver");
// test.set("jacket", "black");
// test.set("ice cream", "orange");
// 
// console.log(test.get("dog"));
// 
// console.log(test.has("lion"));
// console.log(test.has("bird"));
// 
// console.log(test.remove("kite"));
// console.log(test.has("kite"));
// 
// console.log(test.length());
// console.log(test.keys());
// console.log(test.values());
// console.log(test.entries());
// 
// console.log(test.capacity);
// console.log(test.buckets);
// 
// console.log(test.clear());
// console.log(test.capacity);
// console.log(test.buckets);

/* merge sort tests */
console.log('Input: []', `output: [${mergeSort([])}]`);
console.log('Input: [73]', `output: [${mergeSort([73])}]`);
console.log('Input: [1, 2, 3, 4, 5]', `output: [${mergeSort([1, 2, 3, 4, 5])}]`);
console.log('Input: [3, 2, 1, 13, 8, 5, 0, 1]', `output: [${mergeSort([3, 2, 1, 13, 8, 5, 0, 1])}]`);
console.log('Input: [105, 79, 100, 110]', `output: [${mergeSort([105, 79, 100, 110])}]`);