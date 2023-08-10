export interface Player {
    id: string,
    type: string,
    name: string
    score: number;
}

export enum Role {
    CREW = 'crew',
    IMPOSTOR = 'impostor',
    COMPUTER = 'computer'
}

export enum ServerEvent {
    GET_ROLE = 'get-role',
    NOTIFICATION ='notification',
    PROGRESS_UPDATE = 'progress-update',
    PLAYERS_UPDATE = 'players-update'
}

export enum ClientEvent {
    CONNECTION = 'connection',
    DISCONNECT = 'disconnect',
    AUTH = 'auth',
    START_GAME = 'start-game',
    CALL_MEETING = 'call-meeting',
    TASK_DONE = 'task-done',
}

export enum Notification {
    MEETING,
    REPORT,
    SABOTAGE
}