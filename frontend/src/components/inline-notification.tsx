import {socket} from "../websocket/socket";
import {useState} from "react";
import { ServerEvent } from "../../../backend/src/game-types";


export const InlineNotification = () => {
    const [message, setMessage] = useState('')

    socket.on(ServerEvent.NOTIFICATION, (msg)=> {
        setMessage(msg)
    })

    if (!message) {
        return null;
    }

    return (
        <div className="inline-notification">
            {message}
        </div>
    )
}