const { Player } = require("../classes/Player");
const { RoomManager } = require("../Objects");

// event handler for event: 'ready_to_play'
const readyToPlay = (socket, data) => {
    try {
        const playerObj = new Player(data.username, socket, true);
        let roomId = RoomManager.latestRoomId
        if (roomId !== "") {
            console.log("joining existing room");
            socket.join(roomId);
            RoomManager.joinRoom(roomId, playerObj);
        }
        else {
            console.log("creating new room");
            roomId = data.username + socket.id;
            socket.join(roomId);
            RoomManager.createRoom(roomId, playerObj)
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    readyToPlay
}