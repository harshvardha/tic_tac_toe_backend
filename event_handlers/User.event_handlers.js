const { Player } = require("../classes/Player");
const { RoomManager } = require("../Objects");

// event handler for event: 'ready_to_play'
const readyToPlay = (socket, data) => {
    try {
        const playerObj = new Player(data.username, socket, true);
        let roomId = RoomManager.latestRoomId
        if (roomId !== "") {
            socket.join(roomId);
            playerObj.setSide("o");
            RoomManager.joinRoom(roomId, playerObj);
            RoomManager.latestRoomId = "";
            const players = RoomManager.rooms[roomId].getPlayers();
            const playersInfo = {
                1: {
                    username: players[1].username,
                    side: players[1].side
                },
                2: {
                    username: players[2].username,
                    side: players[2].side
                }
            }

            // sending 'joined-room' event to room with 'roomId' except this socket
            socket.to(roomId).emit("game-starting", playersInfo);
            socket.emit("joined-room", playersInfo);
        }
        else {
            roomId = data.username + socket.id;
            socket.join(roomId);
            playerObj.setSide("x");
            RoomManager.createRoom(roomId, playerObj);
            socket.emit("created-room", { message: "waiting for opponent" });
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    readyToPlay
}