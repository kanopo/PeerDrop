import React, { useEffect, useState } from "react";

const Footer = () => {
  const [date, setDate] = useState();

  useEffect(() => {
    let today = new Date();
    setDate(today.getFullYear());
  }, []);

  return (
    <div className="w-[100vw] h-[7vh] flex justify-center items-center bg-[#2e3440] text-[#d8dee9]">
      <p>
        Made with &#10084;&#65039; by{" "}
        <a
          href="https://github.com/kanopo/PeerDrop"
          className="text-[#bf616a] underline"
          target="_blank"
          rel="noreferrer"
        >
          kanopo
        </a>{" "}
        - {date}
      </p>
    </div>
  );
};

export default Footer;
