var socket = io();
var side = 10;
function setup() {
    createCanvas(30 * side, 30 * side);
    background("#acacac");
}
function nkarel(matrix) {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("black");
                rect(x * side, y * side, side, side);
            }
        }
    }
}

setInterval(
    function () {
        socket.on('send matrix', nkarel)
    }, 400
)



function spawnGr() {
    socket.emit('spawnGr');
}

function spawnGrEater() {
    socket.emit('spawnGrEater');
}

function spawnPr() {
    socket.emit('spawnPr');
}

function killPr() {
    socket.emit('killPr');
}

function killGrEat() {
    socket.emit('killGrEat');
}



