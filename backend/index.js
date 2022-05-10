
const express = require("express");
var cors = require("cors");
const app = express();
app.use(cors());

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server);

const PORT = 4000;

let recivers = [];

app.get("/", (req, res) => {
  res.send({ response: "signaling server alive" }).status(200);
});

io.on("connection", (socket) => {
  console.log("new socket: " + socket.id);

  socket.on("reciverOnline", () => {
    //console.log("new reciver")
    recivers.push(socket.id);
  });

  socket.on("disconnect", () => {
    console.log("disconnected: " + socket.id);
    let index = recivers.indexOf(socket.id);

    if (index !== -1) {
      recivers.splice(index, 1);
    }
  });

  socket.on("getRecivers", () => {
    //console.log(recivers)
    socket.emit("listOfRecivers", recivers);
  });


});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

