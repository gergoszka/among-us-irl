import { ClientEvent } from "../../../backend/src/game-types";
import {socket} from "../websocket/socket";

export const ConnectionManager = () => {
    const onStartGame = () => socket.emit(ClientEvent.START_GAME)

    return (
        <>
            <button onClick={onStartGame}>Start Game</button>
        </>
    );
}