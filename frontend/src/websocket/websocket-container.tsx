import { useEffect, useState } from 'react';
import { socket } from './socket';
import {MeetingButtons} from "../components/meeting-buttons";
import {TaskList} from "../components/task-list";
import {ProgressBar} from "../components/progress-bar";
import {ClientEvent, ServerEvent} from "../../../backend/src/game-types"

import './websocket-container.css'
import {InlineNotification} from "../components/inline-notification";
import {PlayersList} from "../components/players-list";

export const WebsocketContainer = () => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [role, setRole] = useState('')

    useEffect(() => {
        const onConnect = () => {
            setIsConnected(true);
            socket.emit(ClientEvent.AUTH, {name: 'Greg', type: 'player', score: 0})
        }

        const onDisconnect = () => {
            setIsConnected(false);
        }

        const storedRole = localStorage.getItem("role")
        if (storedRole){
            setRole(storedRole)
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on(ServerEvent.GET_ROLE,newRole => {
            localStorage.clear();
            if (!storedRole){
                setRole(newRole);
                localStorage.setItem("role", newRole)
            }
        })

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        };
    }, []);

    if (!role) {
        return <PlayersList />
    }

    return (
        <div className="App">
            <span className='header'>
                <ProgressBar/>
                <span>
                Status:<span className={isConnected ? 'on' : 'off'}> {isConnected ? 'connected' : 'disconnected' } </span>
                </span>
            </span>
            <InlineNotification />
            <MeetingButtons role={role}/>
            <TaskList role={role}/>
        </div>
    );
};



