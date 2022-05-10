
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


  // ! ricevo il signal dal peer inizializzatore e lo devo mandare al peer richiesto per la connessione
  socket.on("senderInitialSignal", ([selectedId, signal]) => {
    socket.to(selectedId).emit("senderInitialSignal", [socket.id, signal])
  })

  socket.on("reciverInitialSignal", ([senderId, signal]) => {
    //console.log(senderId)
    //console.log(signal)

    // ! ora mando il signal di risposta al sender iniziale
    socket.to(senderId).emit("reciverAnswer", signal)
  })
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

