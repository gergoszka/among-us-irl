"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notification = exports.ClientEvent = exports.ServerEvent = exports.Role = void 0;
var Role;
(function (Role) {
    Role["CREW"] = "crew";
    Role["IMPOSTOR"] = "impostor";
    Role["COMPUTER"] = "computer";
})(Role = exports.Role || (exports.Role = {}));
var ServerEvent;
(function (ServerEvent) {
    ServerEvent["GET_ROLE"] = "get-role";
    ServerEvent["NOTIFICATION"] = "notification";
    ServerEvent["PROGRESS_UPDATE"] = "progress-update";
    ServerEvent["PLAYERS_UPDATE"] = "players-update";
})(ServerEvent = exports.ServerEvent || (exports.ServerEvent = {}));
var ClientEvent;
(function (ClientEvent) {
    ClientEvent["CONNECTION"] = "connection";
    ClientEvent["DISCONNECT"] = "disconnect";
    ClientEvent["AUTH"] = "auth";
    ClientEvent["START_GAME"] = "start-game";
    ClientEvent["CALL_MEETING"] = "call-meeting";
    ClientEvent["TASK_DONE"] = "task-done";
})(ClientEvent = exports.ClientEvent || (exports.ClientEvent = {}));
var Notification;
(function (Notification) {
    Notification[Notification["MEETING"] = 0] = "MEETING";
    Notification[Notification["REPORT"] = 1] = "REPORT";
    Notification[Notification["SABOTAGE"] = 2] = "SABOTAGE";
})(Notification = exports.Notification || (exports.Notification = {}));
//# sourceMappingURL=game-types.js.map