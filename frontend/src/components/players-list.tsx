import {useEffect, useState} from "react";
import {socket} from "../websocket/socket";
import {ServerEvent} from "../../../backend/src/game-types"

export const PlayersList = () => {
    const [players, setPlayers] = useState<string[]>([])

    useEffect(()=>{
        socket.on(ServerEvent.PLAYERS_UPDATE,(players)=>{
            setPlayers(players)
        })
    })

    return <div>
        {players.map((player, index) => <div key={index}>{player}</div>)}
    </div>
}