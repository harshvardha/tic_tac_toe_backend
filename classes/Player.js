class Player {
    username;
    socket;
    online;
    side;

    constructor(username, socket) {
        this.username = username;
        this.socket = socket;
        this.online = true;
    }

    setSide(side) {
        try {
            if (side === "x" || side === "o")
                this.side = side;
            else
                throw Error("side can either be 'x' or 'o'");
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    Player
}