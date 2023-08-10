"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomRoles = void 0;
const game_types_1 = require("./game-types");
const getRandomRoles = (users) => {
    const roles = [];
    for (let i = 0; i < users.length; i++) {
        roles[i] = game_types_1.Role.CREW;
    }
    roles[0] = game_types_1.Role.IMPOSTOR;
    return roles.sort(() => 0.5 - Math.random());
};
exports.getRandomRoles = getRandomRoles;
//# sourceMappingURL=utility.js.map