class Player {
    username;
    socket;
    online;
    constructor(username, socket) {
        this.username = username;
        this.socket = socket;
        this.online = true;
    }
}

module.exports = {
    Player
}