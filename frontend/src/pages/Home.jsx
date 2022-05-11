import React from "react";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="min-h-[86vh] bg-[#2e3440] text-[#d8dee9]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
      >
        <div className="min-h-[86vh] flex flex-col justify-center items-center">
          <h1 className="text-2xl p-3">PeerDrop</h1>
          <p className="p-5">A simple peer-to-peer file mover.</p>

          <p className="p-5">(ﾉ◕ヮ◕)ﾉ*:・ﾟ✧</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
