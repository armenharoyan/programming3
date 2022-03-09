var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000, () => {
    console.log('connected');
});

function generator(matLen, gr, grEat, pr, fer, fer1) {
    let matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < pr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    for (let i = 0; i < fer; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4;
        }
    }
    for (let i = 0; i < fer1; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5;
        }
    }
    return matrix;
}

matrix = generator(30, 0, 10, 10, 1, 1)


io.sockets.emit('send matrix', matrix)


grassArr = [];
grassEaterArr = [];
predatorArr = [];
fermerArr = [];
fermer1Arr = [];

Grass = require("./Grass")
GrassEater = require("./GrassEater")
Predator = require("./Predator")
Fermer = require("./Fermer")
Fermer1 = require("./Fermer1")

function create_object(matrix) {
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var eater = new GrassEater(x, y, 2);
                grassEaterArr.push(eater);
            }
            else if (matrix[y][x] == 3) {
                var predator = new Predator(x, y, 3);
                predatorArr.push(predator);
            }
            else if (matrix[y][x] == 4) {
                var fermer = new Fermer(x, y, 4);
                fermerArr.push(fermer);
            }
            else if (matrix[y][x] == 5) {
                var fermer1 = new Fermer1(x, y, 4);
                fermer1Arr.push(fermer1);
            }
        }
    }
    io.sockets.emit('send matrix', matrix)
}

function game() {
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].mul();
        grassEaterArr[i].eat();
    }
    for (var i in predatorArr) {
        predatorArr[i].mul();
        predatorArr[i].eat();
    }
    for (var i in fermerArr) {
        fermerArr[i].grPrRespawn();
    }
    if (grassEaterArr.length <= 10) {
        for (var i in fermer1Arr) {
            fermer1Arr[i].grEatRespawn();
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function spawnGr() {
    for (var i = 0; i <= 10; i++) {
        var x = Math.floor(Math.random() * matrix.length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            grassArr.push(new Grass(x, y, 1))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function spawnGrEater() {
    for (var i = 0; i <= 10; i++) {
        var x = Math.floor(Math.random() * matrix.length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0 || matrix[y][x] == 1) {
            matrix[y][x] = 2
            grassEaterArr.push(new GrassEater(x, y, 2));
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function spawnPred() {
    for (var i = 0; i <= 10; i++) {
        var x = Math.floor(Math.random() * matrix.length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 5 || matrix[y][x] == 0) {
            matrix[y][x] = 3
            predatorArr.push(new Predator(x, y, 3));
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function killPred() {
    for (var i = 0; i <= 10; i++) {
        var x = Math.floor(Math.random() * matrix.length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 3) {
            matrix[y][x] = 0
            predatorArr[i].die();

        }
    }
    io.sockets.emit("send matrix", matrix);
}

function killGrEater() {
    for (var i = 0; i <= 10; i++) {
        var x = Math.floor(Math.random() * matrix.length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 2) {
            matrix[y][x] = 0
            grassEaterArr[i].die();

        }
    }
    io.sockets.emit("send matrix", matrix);
}




setInterval(game, 200)
io.on('connection', function (socket) {
    create_object(matrix);
    socket.on('spawnGr', spawnGr);
    socket.on('spawnGrEater', spawnGrEater);
    socket.on('spawnPr', spawnPred);
    socket.on('killPr', killPred);
    socket.on('killGrEat', killGrEater);
})