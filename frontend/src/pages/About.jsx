import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-[86vh] bg-[#2e3440] text-[#d8dee9]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
      >
        <div className="min-h-[86vh] flex flex-col justify-center py-10 items-center">
          <h1 className="text-2xl">About</h1>

          <p>
            This is a personal homework for the course of Tecnologie Internet
          </p>
          <p>
            <a
              href="https://github.com/kanopo/PeerDrop"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-[#bf616a]"
            >
              This repo
            </a>{" "}
            contain all the information about this project.
          </p>

          <p className="p-5">(ﾉ◕ヮ◕)ﾉ*:・ﾟ✧</p>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
