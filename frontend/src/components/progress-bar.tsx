import {useEffect, useState} from "react";
import { ServerEvent } from "../../../backend/src/game-types";
import {socket} from "../websocket/socket";


export const ProgressBar = () => {
    const [progress, setProgress] = useState(0);
    const [maxProgress, setMaxProgress] = useState(0);

    useEffect(()=>{
        socket.on(ServerEvent.PROGRESS_UPDATE,({progress, maxProgress}: {progress: number, maxProgress: number})=>{
            setProgress(progress)
            setMaxProgress(maxProgress)
        })
    },[])

    return (
        <>
            <progress value= {progress} max={maxProgress} >{progress} / {maxProgress}</progress>
        </>
    )
}