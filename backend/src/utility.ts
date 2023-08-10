import {Player, Role} from "./game-types";

export const getRandomRoles = (users: Player[]) => {
    const roles = [];
    for (let i = 0; i < users.length; i++) {
        roles[i] = Role.CREW;
    }
    roles[0] = Role.IMPOSTOR;
    return roles.sort(() => 0.5 - Math.random())
}