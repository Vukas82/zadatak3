
const myMaze = require('./makeMatrix.js');

const make2dArray = myMaze.kreira2dArray;

function blokField() { // make random 20 block field
	for (let d = 0; d < 10; d += 1) {
		for (let g = 0; g < 9; g += 1) {
			if (myMaze[d][g] === 0) {
				myMaze[d][g += 1] = 1;
			} else if (myMaze[d][g] === 0) {
				myMaze[d -= 1][g] = 1;
			} else if (myMaze[d][g] === 0) {
				myMaze[d -= 1][g -= 1] = 1;
			}
			const sum = myMaze.reduce((r, e) => {
				e.forEach((x) => {
					// eslint-disable-next-line no-param-reassign
					r += x;
				});
				return r;
			}, 0);
			if (sum !== 80) {
				make2dArray();
			}
		}
	}
	return blokField;
}
blokField();

module.exports = myMaze;
