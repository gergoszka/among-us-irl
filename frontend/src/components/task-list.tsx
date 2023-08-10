import {ChangeEvent, useEffect, useState} from "react";
import { ClientEvent } from "../../../backend/src/game-types";
import {socket} from "../websocket/socket";

export const TaskList = ({role}: {role:string}) => {
    const [tasks, setTasks] = useState<string[]>([])
    const [doneIndexes, setDoneIndexes] = useState<number[]>(Array(10).fill(0))

    useEffect(()=>{
        const storedTasks: string[] = JSON.parse(localStorage.getItem("tasks") || "{}") || [];
        const storedDoneTasks: number[] = JSON.parse(localStorage.getItem("done") || "{}") || [];

        if (!!storedDoneTasks.length){
            setDoneIndexes(storedDoneTasks)
            socket.emit(ClientEvent.TASK_DONE, storedDoneTasks.reduce((partialSum, a) => partialSum + a, 0))
        }

        if (!storedTasks.length){
            fetch('http://localhost:8080/tasks').then(res => res.json()).then((value: string[]) => {
                setTasks(value)
                localStorage.setItem("tasks", JSON.stringify(value));
            })
        } else {
            setTasks(storedTasks)
        }

    },[])

    const onClick = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const isChecked = e.currentTarget.checked

        const newDoneTasks = doneIndexes.map((value, index1) => {
            if(index1 === index) {
                if (isChecked) {
                    return 1;
                } else {
                    return 0;
                }
            }
            return value
        })
        setDoneIndexes(newDoneTasks)
        localStorage.setItem("done", JSON.stringify(newDoneTasks));

        socket.emit(ClientEvent.TASK_DONE, newDoneTasks.reduce((partialSum, a) => partialSum + a, 0))
    }

    return (
        <div className='task-list'>
            <h2>Task List:  {doneIndexes.reduce((partialSum, a) => partialSum + a, 0)}</h2>
            {tasks.map((value, index) =>
                <div className='task-item' key={index}>
                    <input checked={doneIndexes[index] === 1} disabled={role === 'impostor'} onChange={(event) => onClick(event, index)} style={{marginRight: '5px'}} type="checkbox" id={'task' + index} name='Task' value={1} />
                    <label htmlFor={'task' + index}>{value}</label>
                </div>
            )}
        </div>
    )
}