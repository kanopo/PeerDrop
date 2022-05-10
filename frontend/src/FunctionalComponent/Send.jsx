import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { io } from "socket.io-client";
import Peer from "peerjs";

const Send = () => {

  const [socket, setSocket] = useState(io);
  const [peer, setPeer] = useState(
    new Peer({
      iceServers: [
        {
          urls: "stun:coturn.kanopo.org?transport=tcp",
        },
        {
          urls: "turn:coturn.kanopo.org?transport=tcp",
          username: "dmodmo",
          credential: "password",
        },
      ],
    })
  );

  let [socketId, setSocketId] = useState("");
  let [users, setUsers] = useState([]);
  let [idToCall, setIdToCall] = useState("");


  useEffect(() => {
    setSocket(io("http://localhost:4000"));


  }, []);

  socket.on("connect", () => {
    //console.log(socket.id)
    setSocketId(socket.id);
    socket.emit("getRecivers");
  });

  const getUsers = () => {
    socket.emit("getRecivers");
  };


  socket.on("listOfRecivers", (reciversOnLine) => {
    setUsers(reciversOnLine);
  });

  // ! dopo avere selezionato il peer con il quale ci si vuole connettere, comincio con il signaling
  const tryConnect = (event) => {
    event.preventDefault();

    let selectedId = document.getElementById("selectReciver").value;

    if (selectedId !== "Select one peer to connect with") {
      setIdToCall(selectedId);

      //socket.emit("senderInitialSignal", [selectedId, signalOffer]);
    } else {
      console.error("Select one peer");
    }
  };


  return (
    <div className="min-h-[86vh] bg-[#2e3440] text-[#d8dee9]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
      >
        <div className="min-h-[86vh] flex flex-col justify-center py-10 items-center">
        <p>This is the list of online peers:</p>
          <button onClick={getUsers}>refresh</button>

          <form>
            <select className="bg-[#2e3440] text-[#d8dee9]" id="selectReciver">
              <option value={null} defaultValue>
                Select one peer to connect with
              </option>
              {users.map((user) => (
                <option key={user} value={user} className="border-2">
                  {user}
                </option>
              ))}
            </select>
            <input type="submit" value="Try to connect" onClick={tryConnect} />
          </form>
          <p className="p-5">(ﾉ◕ヮ◕)ﾉ*:・ﾟ✧</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Send;
