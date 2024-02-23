class Room {
    roomId;
    players;

    constructor(roomId) {
        this.roomId = roomId
        this.players = {}
    }
}

module.exports = {
    Room
}