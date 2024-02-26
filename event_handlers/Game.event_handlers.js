const { RoomManager } = require("../Objects");

// event handler for game event: 'move'
const move = (socket, data) => {
    try {
        const roomId = Array.from(socket.rooms)[1];
        const room = RoomManager.rooms[roomId];
        const players = room.getPlayers();
        const game = RoomManager.rooms[roomId].getGameObj();
        if (players[data.playerNo].myChance && !game.getWinner() && !game.isTie()) {
            game.registerMove(data.side, data.blockNo);
            players[data.playerNo].setMyChance(false);
            players[(2 - data.playerNo) + 1].setMyChance(true);
            if (game.getNoOfMoves() >= 3) {
                const result = game.evaluateResult();
                if (result) {
                    socket.emit("game-result", result);
                    socket.to(roomId).emit("game-result", result);
                }
            }
            socket.to(roomId).emit("opponent-move", {
                side: data?.side,
                blockNo: data?.blockNo
            });
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    move
}