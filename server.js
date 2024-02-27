const { Server } = require("socket.io");
const {
    readyToPlay,
    onDisconnect
} = require("./event_handlers/User.event_handlers");
const {
    move
} = require("./event_handlers/Game.event_handlers");

const io = new Server({
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {
    // user events
    socket.on("ready_to_play", data => readyToPlay(socket, data));
    socket.on("disconnect", () => onDisconnect(socket));

    // game events
    socket.on("move", data => move(socket, data));
});

io.listen(5000);