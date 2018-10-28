
const config = require('./config');

/*eslint-disable*/
start = config.start;
end = config.end;
/* eslint-enable */

function solve(start, end) {
	function kreira2dArray(width, height) {
		const result = [];
		for (let i = 0; i < width; i++) {
			result[i] = [];
			for (let j = 0; j < height; j++) {
				result[i][j] = Math.floor(Math.random() * (1 - 0 + 1) + 0);
			}
		}
		return result;
	}
	const myMazeN = kreira2dArray(10, 10);

	myMazeN.reduce((r, e) => {
		e.forEach((x) => {
			/*eslint-disable*/
            r += x;
            /* eslint-enable */
		});
		return r;
	}, 0);


	let d;
	let g;

	function blokPollja() {
		for (d = 0; d < 10; d++) {
			for (g = 0; g < 9; g++) {
				if (myMazeN[d][g] === 0) {
					myMazeN[d][g++] = 1;
				} else if (myMazeN[d][g] === 0) {
					myMazeN[d--][g] = 1;
				} else if (myMazeN[d][g] === 0) {
					myMazeN[d--][g--] = 1;
				}


				const sum = myMazeN.reduce((r, e) => {
					e.forEach((x) => {
						/*eslint-disable*/
                        r += x;
                        /* eslint-enable */
					});
					return r;
				}, 0);

				if (sum !== 80) {
					kreira2dArray();
				} else {
					return blokPollja;
				}
			}
		}
		return d;
	}
	blokPollja();

	myMazeN.reduce((r, e) => {
		e.forEach((x) => {
			/*eslint-disable*/
                 r += x;
             /* eslint-enable */
		});
		return r;
	}, 0);


	const matrix = myMazeN;

	// var w = Math.floor(Math.random() * (9 - 0 + 1) + 0);   // mogucnost random izbora start i end pozicije
	// var u = Math.floor(Math.random() * (9 - 0 + 1) + 0);
	// var f = Math.floor(Math.random() * (9 - 0 + 1) + 0);
	// var g = Math.floor(Math.random() * (9 - 0 + 1) + 0);

	// var start = [w, u];
	// var end = [f, g];

	/*eslint-disable*/
	start = this.start;
	end = this.end;

	function findWay(position, end) { // ne shavatam zasto izbacuje gresku za end
        /* eslint-enable */
		matrix[position[0]][position[1]] = 1;
		const queue = [];
		const validpaths = [];


		queue.push({
			pos: position,
			path: [position],
		});


		while (queue.length > 0) {
			const obj = queue.shift();
			// const pos = obj.pos;
			const { pos } = obj;
			const { path } = obj;

			//  console.log(path);

			// kretanje kroz matricu
			const direction = [[pos[0] + 1, pos[1]], [pos[0], pos[1] + 1],
				[pos[0] - 1, pos[1]], [pos[0], pos[1] - 1]];

			for (let i = 0; i < direction.length; i++) {
				// ogranicavanje
				if (direction[i][0] < 0 || direction[i][0] >= matrix[0].length) continue;
				if (direction[i][1] < 0 || direction[i][1] >= matrix[0].length) continue;
				if (matrix[direction[i][0]][direction[i][1]] !== 1) continue;

				// provera vac posecenih polja
				let visited = false;
				for (let j = 0; j < path.length; j++) {
					if ((path[j][0] === direction[i][0] && path[j][1] === direction[i][1])) {
						visited = true;
						break;
					}
				}
				if (visited) continue;

				// dodavanje novog prohodnog polja u novi array
				const newpath = path.slice(0);

				newpath.push(direction[i]);

				// provera end pozicije
				if (direction[i][0] !== end[0] || direction[i][1] !== end[1]) {
					//  zapisivanje pozicije i puta
					queue.push({
						pos: direction[i],
						path: newpath,
					});
				} else {
					// put
					validpaths.push(newpath);
				}
				break;
			}
		}

		return validpaths;
	}

	const paths = findWay(start, end);


	if (paths.length === 0) {
		solve();
	} else {
		console.log(paths);
	}
}
solve();
