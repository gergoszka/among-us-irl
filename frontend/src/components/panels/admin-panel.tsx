import { useEffect } from "react";
import { socket } from "../../websocket/socket";
import { ClientEvent } from "../../../../backend/src/game-types"
import { ConnectionManager } from "../connection-manager";


export const AdminPanel = () => {
    useEffect(() => {
        const onConnect = () => {
            socket.emit(ClientEvent.AUTH, {name: 'Admin', type: 'admin'})
        }

        socket.on('connect', onConnect);

        return () => {
            socket.off('connect', onConnect);
        };
    }, []);

    return <div>
        <ConnectionManager/>
    </div>
}