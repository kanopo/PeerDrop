import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { io } from "socket.io-client";
import Peer from "peerjs";

const Send = () => {


  let worker1 = new Worker("./blobToBinaryArray.js");
  

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
  const [connection, setConnection] = useState();
  const [state, setState] = useState("");

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
      //console.log(selectedId);
      //socket.emit("senderInitialSignal", [selectedId, signalOffer]);

      let conn = peer.connect(selectedId)
      setConnection(conn)

    } else {
      console.error("Select one peer");
    }
  };

  const [file, setFile] = useState();
  const [blob, setBlob] = useState();
  const [arrayBuffer, setArrayBuffer] = useState();

  const selectFile = (event) => {
    let tmp_file = event.target.files[0];
    setFile(tmp_file);

    let tmp_blob = new Blob([tmp_file], {
      type: tmp_file.type,
    });
    //console.log(tmp_blob)

    worker1.postMessage(tmp_blob);

    //setBlob(tmp_blob);
  };

  worker1.onmessage = (event) => {
    console.log(event.data);
    setArrayBuffer(event.data);
    worker1.terminate();
  };

  const sendFile = () => {
    //worker2.postMessage(arrayBuffer);
    console.log(arrayBuffer);
    connection.send({
      file: arrayBuffer,
      filename: file.name,
      filetype: file.type,
    });
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
          {state}

          <div className="mt-5 flex flex-col justify-center items-center border-2 rounded-lg ">
            <h1 className="py-5">Select the file you want to share</h1>
            <input
              type="file"
              onChange={selectFile}
              className="input input-md m-5 border-2 rounded-lg p-2 w-[70vw] md:w-[30vw] hover:text-[#2e3440] hover:bg-[#d8dee9]"
            ></input>
            <button
              className="p-5 m-5 w-[70vw] md:w-[30vw] text-center border-2 rounded-lg hover:text-[#2e3440] hover:bg-[#d8dee9]"
              onClick={sendFile}
            >
              Send file
            </button>
            </div>

       
          <p className="p-5">(ﾉ◕ヮ◕)ﾉ*:・ﾟ✧</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Send;
