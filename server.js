const { Server } = require("socket.io");
const {
    readyToPlay
} = require("./event_handlers/User.event_handlers");

const io = new Server({
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {
    // user events
    socket.on("ready_to_play", data => readyToPlay(socket, data));
});

io.listen(5000);