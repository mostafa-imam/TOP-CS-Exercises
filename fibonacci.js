export { fibs, fibsRec }

function fibs(n) {

    if (n === 0) return [0]
    if (n === 1) return [0, 1];

    let fib = [0, 1];

    for (let i = 2; i < n; i++) {
        fib[i] = fib[i - 1] + fib[i - 2]
    }

    return fib;
};

function helper(n) {
    return (n === 0 || n === 1) ? n : helper(n - 1) + helper(n - 2);
}

function fibsRec(n) {

    let arr = [];

    for (let i = 0; i < n; i++) {
        arr.push(helper(i));
    }

    return arr;
}

console.log(`fibonacci using iteration (n = 5): [${fibs(5)}]`);
console.log(`fibonacci using iteration (n = 8): [${fibs(8)}]`);

console.log(`fibonacci using recursion (n = 5): [${fibsRec(5)}]`);
console.log(`fibonacci using recursion (n = 8): [${fibsRec(8)}]`);