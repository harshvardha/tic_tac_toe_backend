class Room {
    roomId;
    players;
    noOfPlayers;
    gameObj;

    constructor(roomId) {
        this.roomId = roomId;
        this.players = {};
        this.noOfPlayers = 0;
    }

    getPlayers() {
        return this.players;
    }

    addPlayer(playerObj) {
        if (this.noOfPlayers >= 0 && this.noOfPlayers < 2) {
            this.players[this.noOfPlayers + 1] = playerObj;
            this.noOfPlayers += 1;
        } else {
            throw Error("There can be max 2 players or min 0 players in one room.");
        }
    }

    setGameObj(gameObj) {
        this.gameObj = gameObj;
    }

    getGameObj() {
        return this.gameObj;
    }

    getNoOfPlayers() {
        return Object.keys(this.players).length;
    }
}

module.exports = {
    Room
}