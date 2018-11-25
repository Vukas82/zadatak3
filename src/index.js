
const matrix = require('./makeMatrix.js');
const config = require('./config');


function findWay(position, endPosition) {
	matrix[position[0]][position[1]] = 1;
	const queue = [];
	const validpaths = [];
	let newpath = [];
	// New points, where we did not check the surroundings:
	// remember the position and how we got there
	// initially our starting point and a path containing only this point
	queue.push({
		pos: position,
		path: [position],
	});

	// as long as we have unchecked points
	while (queue.length > 0) {
		const obj = queue.shift();
		const { pos } = obj;
		const { path } = obj;

		// movement through the matrix
		const direction = [[pos[0] + 1, pos[1]], [pos[0], pos[1] + 1],
			[pos[0] - 1, pos[1]], [pos[0], pos[1] - 1]];

		for (let i = 0; i < direction.length; i += 1) {
			// check if out of bounds or in a "wall"
			if (direction[i][0] < 0 || direction[i][0] >= matrix[0].length) continue;
			if (direction[i][1] < 0 || direction[i][1] >= matrix[0].length) continue;
			if (matrix[direction[i][0]][direction[i][1]] !== 1) continue;

			// check if we were at this point with this path already:
			let visited = false;
			for (let j = 0; j < path.length; j += 1) {
				if ((path[j][0] === direction[i][0] && path[j][1] === direction[i][1])) {
					visited = true;
					break;
				}
			}
			if (visited) continue;

			// copy path
			newpath = path.slice(0);
			newpath.push(direction[i]);

			// check if we are at end
			if (direction[i][0] !== endPosition[0] || direction[i][1] !== endPosition[1]) {
				// remember position and the path to it
				queue.push({
					pos: direction[i],
					path: newpath,
				});
			} else {
				validpaths.push(newpath);
			}
			break;
		}
	}
	return newpath;
}

const paths = findWay(config.start, config.end);

if (paths.length !== 0) {
	console.log(`${paths} the shortest way`);
}
return findWay(config.start, config.end);
