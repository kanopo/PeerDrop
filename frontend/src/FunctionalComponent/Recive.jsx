import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { io } from "socket.io-client";
import Peer from "peerjs";
const Recive = () => {
  const [socket, setSocket] = useState(io);
  const [peer, setPeer] = useState(new Peer());

  const [state, setState] = useState("");

  let [socketId, setSocketId] = useState("");

  useEffect(() => {
    //setSocket(io("http://localhost:4000"));
    setSocket(io("https://p2p.kanopo.org/socket-io/"))
  }, []);

  socket.on("connect", () => {
    //console.log(socketRef.current.id)
    setSocketId(socket.id);
    socket.emit("reciverOnline");

    setPeer(
      new Peer(socket.id, {
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
  });

  const [file, setFile] = useState();
  const [downloadUI, setDownlodUI] = useState(<h1>nothing to download</h1>);
  const [copied, setCopied] = useState("");

  peer.on("open", () => {
    if (peer.id.length < 25) {
    }
  });

  peer.on("connection", (conn) => {
    console.log("connection")
    setState("Waiting for file")
    let uuid = crypto.randomUUID();
      conn.on("data", (data) => {
        console.log("recived: ", data);

        let blob = new Blob([data.file], { type: data.filetype });
        let url = URL.createObjectURL(blob);

        let handleDownload = async () => {
          setFile({
            id: uuid,
            url: url,
            name: data.filename,
          });

          setDownlodUI(
            <a href={file.url} download={file.name}>
              {file.name}
            </a>
          );
        };

        handleDownload();
      });
  })

  useEffect(() => {
    if (file === undefined) {
      setDownlodUI(<h1>Nothing recived</h1>);
    } else {
      setDownlodUI(
        <a href={file.url} download={file.name} className="p-5 m-5 w-[70vw] md:w-[30vw] text-center border-2 rounded-lg hover:text-[#2e3440] hover:bg-[#d8dee9] visible">
          Download {file.name}
        </a>
      );
      setCopied("")
    }
  }, [file]);



  return (
    <div className="min-h-[86vh] bg-[#2e3440] text-[#d8dee9]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
      >
        <div className="min-h-[86vh] flex flex-col justify-center py-10 items-center">
          <p>Your id is:</p>
          <p>{peer.id}</p>

          <div className="text-xl underline text-[#bf616a]">{state}</div>

          <div className="invisible pt-10 pb-5">
            {downloadUI}
          </div>

          <p className="p-5">(ﾉ◕ヮ◕)ﾉ*:・ﾟ✧</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Recive;
