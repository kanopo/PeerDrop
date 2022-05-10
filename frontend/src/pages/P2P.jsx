import React, { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";

const P2P = () => {
  return (
    <div className="min-h-[86vh] bg-[#2e3440] text-[#d8dee9]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
      >
        <div className="min-h-[86vh] flex flex-col justify-center py-10 items-center">
          <h1 className="text-2xl">P2P</h1>

          <p>Do you want</p>
          <Link
            to="/p2p/send"
            className="p-3 m-3 w-[70vw] md:w-[30vw] text-center border-2 rounded-lg hover:text-[#2e3440] hover:bg-[#d8dee9]"
          >
            Send
          </Link>
          <p>or</p>
          <Link
            to="/p2p/recive"
            className="p-3 m-3 w-[70vw] md:w-[30vw] text-center border-2 rounded-lg hover:text-[#2e3440] hover:bg-[#d8dee9]"
          >
            Recive
          </Link>
          <p>data?</p>

          <p className="p-5">(ﾉ◕ヮ◕)ﾉ*:・ﾟ✧</p>
        </div>
      </motion.div>
    </div>
  );
};

export default P2P;
