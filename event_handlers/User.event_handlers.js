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
            playerObj.setMyChance(false);
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
            playerObj.setMyChance(true);
            RoomManager.createRoom(roomId, playerObj);
            socket.emit("created-room", { message: "waiting for opponent" });
        }
    } catch (error) {
        console.log(error);
    }
}

// event handler for event: 'disconnect'
const onDisconnect = (socket) => {
    try {
        const roomId = Array.from(socket.rooms)[1];
        socket.to(roomId).emit("opponent-disconnected");
        let roomsArray = Object.entries(RoomManager.rooms);
        roomsArray = roomsArray.filter(([key, value]) => key !== roomId);
        RoomManager.rooms = Object.fromEntries(roomsArray);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    readyToPlay,
    onDisconnect
}