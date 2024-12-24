import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";

const Header = ({ email, userName }) => {
  const [showCommand, setShowCommand] = useState(false);
  return (
    <header className="h-16 flex items-center justify-between px-2">
      <section className="flex items-center gap-2">
        <div className="font-bold h-10 w-10 flex items-center justify-center rounded-full text-[1.5rem] bg-blue-400">
          <p>{email[0].toUpperCase()}</p>
        </div>
        <div className="text-[0.7rem] font-semibold">
          <p>{email}</p>
          <p>{userName}</p>
        </div>
      </section>
      <section className="relative">
        <button
          className={`border px-2 py-1 rounded-md font-bold 
          opacity-[0.8] hover:opacity-[1] ${
            showCommand ? "bg-gray-800" : "bg-transparent"
          }`}
          onClick={() => {
            setShowCommand((current) => {
              if (current) return false;
              return true;
            });
          }}
        >
          Commands
        </button>
        <div
          className={` -left-24 top-10 absolute w-fit h-fit bg-gray-800 text-nowrap text-[0.8rem] p-2 rounded-lg z-50 flex flex-col justify-between gap-2 ${
            showCommand ? "visible" : "hidden"
          }`}
        >
          <div>
            <p>
              /clear:{" "}
              <span className="text-blue-400">clear chat from database.</span>
            </p>
            <p>
              /logout: <span className="text-blue-400">logout of Accout.</span>
            </p>
          </div>
          <div className="text-[1.5rem] w-fit">
            <a href="https://github.com/samzilee/AiChat" target="_blank">
              <FaGithub className="hover:text-gray-300" />
            </a>
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;
