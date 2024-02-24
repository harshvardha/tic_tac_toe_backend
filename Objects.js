const { Room } = require("./classes/Room");

const RoomManager = {
    latestRoomId: "",
    rooms: {},
    createRoom: function (roomId, playerObj) {
        const room = new Room(roomId);
        this.rooms[roomId] = room;
        this.latestRoomId = roomId
        this.joinRoom(roomId, playerObj);
    },
    joinRoom: function (roomId, playerObj) {
        try {
            if (!roomId || !playerObj) {
                throw Error("room id and player object both are required.");
            }
            const room = this.rooms[roomId];
            if (!room) {
                throw Error("room does not exist.");
            }
            room.addPlayer(playerObj);
        } catch (error) {
            console.log(error);
        }
    }
}

const GameManager = {

}

module.exports = {
    RoomManager
}