import {FormEvent, useEffect, useState} from "react";
import { ClientEvent } from "../../../backend/src/game-types";
import {socket} from "../websocket/socket";

export function MeetingButtons({role}: {role:string}) {
    const [counter, setCounter] = useState(10);

    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);

    const onMeeting = (event: FormEvent) => {
        event.preventDefault();
        socket.emit(ClientEvent.CALL_MEETING, 'A Meeting has been called!');
    }

    const onReport = (event: FormEvent) => {
        event.preventDefault();
        socket.emit(ClientEvent.CALL_MEETING, 'Dead body reported!'.toUpperCase());
    }

    return (
        <>
            <div className="meeting-buttons">
                <button disabled={!!counter} title="meeting-button" onClick={onMeeting} type="submit" >Emergency Meeting { !!counter && '(' + counter + ')' }</button>
                <button onClick={onReport} type="submit">Report Body</button>
            </div>

            { role === 'impostor' &&
                <div className="sabotages">
                    <button type="submit">Reactor Meltdown</button>
                    <button type="submit">Oxygen</button>
                </div>
            }
        </>
    );
}