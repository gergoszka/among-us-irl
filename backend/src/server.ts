import express from 'express';
import http from 'http';
import {Server} from "socket.io";
import {ClientEvent, Player, Role, ServerEvent} from "./game-types";
import fs from 'fs';
import cors from 'cors';
import {getRandomRoles} from "./utility";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server,{ cors: {
        origin: "http://localhost:3000"
    }});

let players: Player[] = [];
let progress = 0;
let adminId = '';
let reactorCounter = 0;

io.on(ClientEvent.CONNECTION, (socket) => {
    console.log('user connected: ' + socket.id);

    socket.on(ClientEvent.AUTH, (player) => {
        console.log(player);
        //TODO add checks

        if(player.type === 'player') {
            players.push({id: socket.id, ...player});
        } else {
            adminId = socket.id;
        }

        io.emit(ServerEvent.PLAYERS_UPDATE, players.map(player => player.name));
    })

    socket.on(ClientEvent.START_GAME, () => {
        //TODO check if enough players and admin id exists
       const shuffled = getRandomRoles(players);

        players.forEach((user, index) => {
            io.to(user.id).emit(ServerEvent.GET_ROLE, shuffled[index]);
        })
        progressUpdate(0);
    })

    socket.on(ClientEvent.CALL_MEETING, (text) => {
        io.emit(ServerEvent.NOTIFICATION, text);
    })

    socket.on(ClientEvent.TASK_DONE, (value) => {
        players = players.map(player => {
            if (player.id === socket.id){
                return {...player, score: value }
            }
            return player;
        })

        console.log(players.reduce((partialSum, a) => partialSum + a.score, 0))
        progressUpdate(players.reduce((partialSum, a) => partialSum + a.score, 0));
    })

    socket.on(ClientEvent.DISCONNECT, () => {
        console.log('user disconnected: ' + socket.id);
        players = players.filter(user => user.id !== socket.id);
        progressUpdate(0);
        io.emit(ServerEvent.PLAYERS_UPDATE, players.map(player => player.name));
    })

    // Sabotages

    socket.on("sabotage-reactor", (isPressed) => {
        isPressed ? reactorCounter++ : reactorCounter--;
        console.log(reactorCounter);
    })


    socket.on("sabotage-oxygen", (isPressed) => {
        isPressed ? reactorCounter++ : reactorCounter--;
        console.log(reactorCounter);
    })
});

app.get('/tasks', (req, res) => {
    try {
        const data = fs.readFileSync('tasks.txt', 'utf8');
        const lines = data.split('\r\n');

        const shuffled = lines.sort(() => 0.5 - Math.random());

        // Get sub-array of first n elements after shuffled
        const selected = shuffled.slice(0, 10);

        res.send(selected);
    } catch (err) {
        console.error(err);
    }
})

const progressUpdate = (value: number) => {
    progress = value;
    const maxProgress = (players.length - 1) * 10;
    io.emit(ServerEvent.PROGRESS_UPDATE, {progress, maxProgress});
}

server.listen(8080, () => {
    console.log('listening on: 8080');
});