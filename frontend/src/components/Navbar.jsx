import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-[100vw] h-[7vh] flex justify-between items-center px-5 bg-[#2e3440] text-[#d8dee9]">
      <Link to="/" className="underline text-[#bf616a]">
        PeerDrop
      </Link>
      <div className="w-[40vw]  md:w-[20vw] m-h-[7vh] flex justify-around items-center">
        <Link to="/" className="hover:underline hover:text-[#bf616a] p-2">
          Home
        </Link>
        <Link to="/p2p" className="hover:underline hover:text-[#bf616a] p-2">
          P2P
        </Link>
        <Link to="about" className="hover:underline hover:text-[#bf616a] p-2">
          About
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
