const config = require('./config');


function make2dArray(widthX, heightY) { // make a matrix
	const result = [];
	for (let i = 0; i < widthX; i += 1) {
		result[i] = [];
		for (let j = 0; j < heightY; j += 1) {
			result[i][j] = Math.floor(Math.random() * (1 - 0 + 1) + 0);
		}
	}
	return result;
}

make2dArray(config.width, config.height);

module.exports = make2dArray(config.width, config.height);
