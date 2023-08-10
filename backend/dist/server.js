"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const game_types_1 = require("./game-types");
const fs_1 = __importDefault(require("fs"));
const cors_1 = __importDefault(require("cors"));
const utility_1 = require("./utility");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, { cors: {
        origin: "http://localhost:3000"
    } });
let players = [];
let progress = 0;
let adminId = '';
let reactorCounter = 0;
io.on(game_types_1.ClientEvent.CONNECTION, (socket) => {
    console.log('user connected: ' + socket.id);
    socket.on(game_types_1.ClientEvent.AUTH, (player) => {
        console.log(player);
        //TODO add checks
        if (player.type === 'player') {
            players.push(Object.assign({ id: socket.id }, player));
        }
        else {
            adminId = socket.id;
        }
        io.emit(game_types_1.ServerEvent.PLAYERS_UPDATE, players.map(player => player.name));
    });
    socket.on(game_types_1.ClientEvent.START_GAME, () => {
        //TODO check if enough players and admin id exists
        const shuffled = (0, utility_1.getRandomRoles)(players);
        players.forEach((user, index) => {
            io.to(user.id).emit(game_types_1.ServerEvent.GET_ROLE, shuffled[index]);
        });
        progressUpdate(0);
    });
    socket.on(game_types_1.ClientEvent.CALL_MEETING, (text) => {
        io.emit(game_types_1.ServerEvent.NOTIFICATION, text);
    });
    socket.on(game_types_1.ClientEvent.TASK_DONE, (value) => {
        players = players.map(player => {
            if (player.id === socket.id) {
                return Object.assign(Object.assign({}, player), { score: value });
            }
            return player;
        });
        console.log(players.reduce((partialSum, a) => partialSum + a.score, 0));
        progressUpdate(players.reduce((partialSum, a) => partialSum + a.score, 0));
    });
    socket.on(game_types_1.ClientEvent.DISCONNECT, () => {
        console.log('user disconnected: ' + socket.id);
        players = players.filter(user => user.id !== socket.id);
        progressUpdate(0);
        io.emit(game_types_1.ServerEvent.PLAYERS_UPDATE, players.map(player => player.name));
    });
    // Sabotages
    socket.on("sabotage-reactor", (isPressed) => {
        isPressed ? reactorCounter++ : reactorCounter--;
        console.log(reactorCounter);
    });
});
app.get('/tasks', (req, res) => {
    try {
        const data = fs_1.default.readFileSync('tasks.txt', 'utf8');
        const lines = data.split('\r\n');
        const shuffled = lines.sort(() => 0.5 - Math.random());
        // Get sub-array of first n elements after shuffled
        const selected = shuffled.slice(0, 10);
        res.send(selected);
    }
    catch (err) {
        console.error(err);
    }
});
const progressUpdate = (value) => {
    progress = value;
    const maxProgress = (players.length - 1) * 10;
    io.emit(game_types_1.ServerEvent.PROGRESS_UPDATE, { progress, maxProgress });
};
server.listen(8080, () => {
    console.log('listening on: 8080');
});
//# sourceMappingURL=server.js.map