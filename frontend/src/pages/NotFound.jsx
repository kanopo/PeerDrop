import React from "react";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
    >
      <div className="min-h-[86vh] bg-[#2e3440] text-[#d8dee9] p-5 flex flex-col justify-center items-center">
        <h1>404</h1>
        <p>Use a correct path</p>
        <p>:(</p>
      </div>
    </motion.div>
  );
};

export default NotFound;
