export { mergeSort }

function mergeSort(arr) {
    if (arr.length <= 1) return arr;

    let mid = Math.trunc(arr.length / 2);
    let leftArr = mergeSort(arr.slice(0, mid));
    let rightArr = mergeSort(arr.slice(mid, arr.length));

    return merge(leftArr, rightArr);
};

function merge(leftArr, rightArr) {
    let returnedArr = [];

    while (leftArr.length && rightArr.length) {
        if (leftArr[0] < rightArr[0]) {
            returnedArr.push(leftArr[0]);
            leftArr.shift();
        }

        if (leftArr[0] > rightArr[0]) {
            returnedArr.push(rightArr[0]);
            rightArr.shift();
        }

        if (leftArr[0] === rightArr[0]) {
            returnedArr.push(leftArr[0]);
            leftArr.shift();
        }
    }

    if (leftArr.length) {
        leftArr.forEach(item => {
            returnedArr.push(item);
        })
    }

    if (rightArr.length) {
        rightArr.forEach(item => {
            returnedArr.push(item)
        })
    }

    return returnedArr;
}