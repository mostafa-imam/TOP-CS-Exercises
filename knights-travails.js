function knightMoves(start, end) {
    function isValid(pos) {
        return pos[0] >= 0 && pos[0] <= 7 && pos[1] >= 0 && pos[1] <= 7;
    }

    if (!isValid(start)) throw new Error("Start position is not a valid move");
    if (!isValid(end)) throw new Error("End position is not a valid move");

    let queue = [start];
    let visited = new Set();
    let parent = {};

    visited.add(start.toString());
    parent[start.toString()] = null;

    while (queue.length > 0) {
        let current = queue.shift();
        let [x, y] = current;

        if (x === end[0] && y === end[1]) break;

        let moves = [
            [x + 2, y + 1],
            [x + 2, y - 1],
            [x + 1, y + 2],
            [x - 1, y + 2],
            [x - 2, y + 1],
            [x - 2, y - 1],
            [x + 1, y - 2],
            [x - 1, y - 2],
        ];

        for (let move of moves) {
            let key = move.toString();

            if (isValid(move) && !visited.has(key)) {
                queue.push(move);
                visited.add(key);
                parent[key] = current.toString();
            }
        }
    }

    let path = [];
    let currentKey = end.toString();
    while (currentKey !== null) {
        let [x, y] = currentKey.split(",").map(Number);
        path.push([x, y]);
        currentKey = parent[currentKey];
    }

    path.reverse();

    console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
    path.forEach(step => console.log(step));

    return path;
}

knightMoves([0, 0], [7, 7])