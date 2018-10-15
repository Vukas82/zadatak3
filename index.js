
var config = require('./config');

start = config.start;
end = config.end;



solve()

function solve(start,end) {


    var myMazeN = kreira2dArray(10, 10);

    function kreira2dArray(width, height) { 
        var result = [];
        for (var i = 0; i < width; i++) {
            result[i] = [];
            for (var j = 0; j < height; j++) {
                result[i][j] = Math.floor(Math.random() * (1 - 0 + 1) + 0)
            }
        }
        return result;
    }
    var sum = myMazeN.reduce(function (r, e, i) {
        e.forEach(function (x, y) {
            r += x
        })
        return r;

    }, 0)

    blokPollja()

    var d;
    var g;

    function blokPollja() {

        for (d = 0; d < 10; d++) {
            for (g = 0; g < 9; g++) {
                if (myMazeN[d][g] === 0) {
                    myMazeN[d][g++] = 1
                } else if (myMazeN[d][g] === 0) {
                    myMazeN[d--][g] = 1
                } 
                else if (myMazeN[d][g] === 0) {
                    myMazeN[d--][g--] = 1
                }


                var sum = myMazeN.reduce(function (r, e, i) {
                    e.forEach(function (x, y) {
                        r += x
                    })
                    return r;

                }, 0)

                if (sum !== 80) {
                    kreira2dArray()
                } else {
                    return blokPollja;
                }

            }

        }

    }
    var sum = myMazeN.reduce(function (r, e, i) {
        e.forEach(function (x, y) {
            r += x
        })
        return r;
    }, 0)


    var matrix;
    matrix = myMazeN;

    // var w = Math.floor(Math.random() * (9 - 0 + 1) + 0);   // mogucnost random izbora start i end pozicije
    // var u = Math.floor(Math.random() * (9 - 0 + 1) + 0);
    // var f = Math.floor(Math.random() * (9 - 0 + 1) + 0);
    // var g = Math.floor(Math.random() * (9 - 0 + 1) + 0);

    // var start = [w, u];
    // var end = [f, g];




    var start = this.start;
    var end = this.end;


    var paths = findWay(start, end); 




    
    function findWay(position, end) {
        matrix[position[0]][position[1]] = 1;

        var queue = [];
        var validpaths = [];


        queue.push({
            pos: position,
            path: [position]
        });


        while (queue.length > 0) {

            var obj = queue.shift();
            var pos = obj.pos;
            var path = obj.path;

            //  console.log(path);

            // kretanje kroz matricu
            var direction = [[pos[0] + 1, pos[1]], [pos[0], pos[1] + 1],
                   [pos[0] - 1, pos[1]], [pos[0], pos[1] - 1]];

            for (var i = 0; i < direction.length; i++) {

                // ogranicavanje 
                if (direction[i][0] < 0 || direction[i][0] >= matrix[0].length) continue;
                if (direction[i][1] < 0 || direction[i][1] >= matrix[0].length) continue;
                if (matrix[direction[i][0]][direction[i][1]] != 1) continue;

                // provera vac posecenih polja
                var visited = false;
                for (var j = 0; j < path.length; j++) {
                    if ((path[j][0] == direction[i][0] && path[j][1] == direction[i][1])) {
                        visited = true;
                        break;

                    }
                }
                if (visited) continue;

                // dodavanje novog prohodnog polja u novi array
                var newpath = path.slice(0);

                newpath.push(direction[i]);

                // provera end pozicije
                if (direction[i][0] != end[0] || direction[i][1] != end[1]) {
                    //  zapisivanje pozicije i puta
                    queue.push({
                        pos: direction[i],
                        path: newpath
                    });
                } else {
                    // put 
                    validpaths.push(newpath);
                }
                break

            }
        }

        return validpaths;
    }


    if (paths.length === 0) {
        solve()
    } else {
        console.log(paths);
    }
}
