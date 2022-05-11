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
    //setSocket(io("https://p2p.kanopo.org/socket-io/"))
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

      let conn = peer.connect(selectedId, {
        reliable: true,
      });

      setConnection(conn);
    } else {
      console.error("Select one peer");
    }
  };

  const [file, setFile] = useState();
  const [arrayOfChunks, setArrayOfChunks] = useState();
  const [blob, setBlob] = useState();

  const selectFile = (event) => {
    let tmp_file = event.target.files[0];
    setFile(tmp_file);

    let tmp_blob = new Blob([tmp_file], {
      type: tmp_file.type,
    });

    setBlob(tmp_blob);

    worker1.postMessage(tmp_blob);
  };

  worker1.onmessage = (event) => {
    console.log(event.data);

    setArrayOfChunks(event.data);
    worker1.terminate();
  };

  const sendFile = () => {
    for (let i = 0; i < arrayOfChunks.length; i++) {

      console.log(arrayOfChunks.length)

      let done = false;

      if (i === arrayOfChunks.length - 1) {
        done = true;
      }

      
      connection.send({
        file: arrayOfChunks[i],
        filename: file.name,
        filetype: file.type,
        done: done
      });
    }

    

    //worker2.postMessage(arrayBuffer);
    //console.log(arrayBuffer);
    /*
    connection.send({
      file: arrayBuffer,
      filename: file.name,
      filetype: file.type,
    });
    */
  };

  return (
    <div className="min-h-[86vh] bg-[#2e3440] text-[#d8dee9]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
      >
        <div className="min-h-[86vh] flex flex-col justify-center py-10 items-center">
          <form className="flex flex-col border-2 rounded-lg justify-center items-center">
            <p className="pt-5">This is the list of online peers:</p>

            <select
              className="bg-[#2e3440] text-[#d8dee9] p-3 m-3 w-[70vw] md:w-[30vw] text-center border-2 rounded-lg hover:text-[#2e3440] hover:bg-[#d8dee9]"
              id="selectReciver"
            >
              <option value={null} defaultValue>
                Select one peer to connect with
              </option>
              {users.map((user) => (
                <option key={user} value={user} className="border-2">
                  {user}
                </option>
              ))}
            </select>

            <button
              onClick={getUsers}
              className="p-3 m-3 w-[70vw] md:w-[30vw] text-center border-2 rounded-lg hover:text-[#2e3440] hover:bg-[#d8dee9]"
            >
              refresh
            </button>

            <input
              type="submit"
              value="Try to connect"
              onClick={tryConnect}
              className="p-3 m-3 w-[70vw] md:w-[30vw] text-center border-2 rounded-lg hover:text-[#2e3440] hover:bg-[#d8dee9]"
            />
          </form>
          {state}

          <div className="mt-5 flex flex-col justify-center items-center border-2 rounded-lg ">
            <h1 className="py-3">Select the file you want to share</h1>
            <input
              type="file"
              onChange={selectFile}
              className="input input-md m-3 border-2 rounded-lg p-2 w-[70vw] md:w-[30vw] hover:text-[#2e3440] hover:bg-[#d8dee9]"
            ></input>
            <button
              className="p-3 m-3 w-[70vw] md:w-[30vw] text-center border-2 rounded-lg hover:text-[#2e3440] hover:bg-[#d8dee9]"
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
