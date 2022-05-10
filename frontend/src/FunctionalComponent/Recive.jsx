import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { io } from "socket.io-client";
import Peer from "peerjs";
const Recive = () => {

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


  useEffect(() => {
    setSocket(io("http://localhost:4000"));
  }, []);

  socket.on("connect", () => {
    //console.log(socketRef.current.id)
    setSocketId(socket.id);
    socket.emit("reciverOnline");
  });


  return (
    <div className="min-h-[86vh] bg-[#2e3440] text-[#d8dee9]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
      >
        <div className="min-h-[86vh] flex flex-col justify-center py-10 items-center">
          <p>Your id is:</p>
          <p>{socketId}</p>
          
          <p className="p-5">(ﾉ◕ヮ◕)ﾉ*:・ﾟ✧</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Recive;
