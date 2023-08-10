import {FormEvent, useEffect, useState} from "react";
import { socket } from "../../websocket/socket";
import { ClientEvent } from "../../../../backend/src/game-types"

import './panels.css'

export const SabotagePanel = () => {

    useEffect(() => {
        const onConnect = () => {
            socket.emit(ClientEvent.AUTH, {name: 'Computer', type: 'sabotage'})
        }

        socket.on('connect', onConnect);

        return () => {
            socket.off('connect', onConnect);
        };
    }, []);


    return <div>
        <ReactorButton text="Hold" />
        <CommunicationPanel />
    </div>
}



const ReactorButton = ({text}: {text: string}) => {
    const [isPressed, setIsPressed] = useState(false);

    const onMouseDown = () => {
        socket.emit("sabotage-reactor", true)
        setIsPressed(true)
    }

    const onMouseUp = () => {
        socket.emit("sabotage-reactor", false)
        setIsPressed(false)
    }

    return  <button className={isPressed? 'reactor-button-pressed': 'reactor-button'} onMouseDown={onMouseDown} onMouseUp={onMouseUp}> {text} </button>
}

const CommunicationPanel = () => {
    const [counter, setCounter] = useState(10);
    const [code, setCode] = useState(Math.round(Math.random() * 1000000));
    const [inputValue, setInputValue] = useState(0);
    const [isSuccess, setIsSuccess] = useState(false)

    useEffect(() => {
        counter >= 0 && setTimeout(() => setCounter(counter - 1), 1000);
        console.log(counter)
        if (counter < 0) {
            setCounter(10)
            setCode(Math.round(Math.random() * 1000000))
        }

    }, [counter]);

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(inputValue)
        if (inputValue === code) {
            setIsSuccess(true)
            console.log("SUCCESS")
        }
    }

    if (isSuccess) {
        return <div>You made it!</div>
    }

    return (
        <div>
            <input onChange={(event) => setInputValue(Number(event.currentTarget.value))} type="number" />
            <button  onClick={onSubmit} type="submit" > Submit </button>
            <div>
                {code}
                {counter > -1 && <span> ({counter})</span>}
            </div>
        </div>
    )
}