import React, { useEffect, useRef, useState } from "react";
import { chatAi } from "../../../Utils/Aimodel";
import { TextMarkDown } from "./TextMarkDown";
import { logOut } from "../../../Utils/aut.utils";
import { listDocument } from "../../../Utils/db";
import { updateDocument } from "../../../Utils/db";

const Main = ({ sessionId, userId }) => {
  const [userInput, setUserInput] = useState("");
  const [chats, setChats] = useState([]);
  const form = useRef(null);
  const containerRef = useRef(null);

  const scrollToBottom = () => {
    containerRef.current.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const handlelogOut = async () => {
    try {
      const result = await logOut(sessionId);
      console.log(result);
      localStorage.removeItem("AiChatUserData");
      window.location.href = "/login";
    } catch (error) {
      console.log(error);
    }
  };

  const handleChat = async (event) => {
    event.preventDefault();
    if (userInput === "") return;
    if (userInput === "/clear") {
      setChats([]);
      saveChat([]);
      return setUserInput("");
    }
    if (userInput === "/logout") {
      console.log("loging out..");
      setUserInput("");
      return handlelogOut();
    }
    setUserInput("");
    setChats((current) => {
      return [...current, { sender: "You", message: userInput }];
    });
    try {
      const result = await chatAi(userInput);
      setChats((current) => {
        return [
          ...current,
          {
            sender: "Ai",
            message: result.response.text(),
          },
        ];
      });
    } catch (error) {
      setChats((current) => {
        return [
          ...current,
          { sender: "Ai", message: "Oops! Something went wrong 🤖" },
        ];
      });
      console.log(error);
    }
  };

  const saveChat = async (data) => {
    try {
      await updateDocument(userId, {
        chats: JSON.stringify(data),
      });
      console.log("updateDocument...Done");
    } catch (error) {
      console.log(error);
    }
  };
  const listChat = async () => {
    try {
      const list = await listDocument(userId);
      setChats(() => {
        return JSON.parse(list.documents[0].chats);
      });
      console.log("listDocument...Done");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listChat();
  }, []);

  useEffect(() => {
    if (!chats[0]) return;
    saveChat(chats);
    scrollToBottom();
  }, [chats]);

  return (
    <main className=" h-full flex  flex-col overflow-auto">
      <section ref={containerRef} className="px-2 flex-[2]  overflow-auto">
        <ul className="flex flex-col py-2 md:items-end gap-5">
          {chats.map((chat, index) => {
            return (
              <li
                key={index}
                className={`flex flex-col gap-1  justify-center md:w-[70%] ${
                  chat.sender === "You"
                    ? "items-end flex-row-reverse text-end"
                    : "items-start"
                }`}
              >
                <div
                  className={`${
                    chat.sender === "You" ? " bg-blue-400" : "bg-green-400"
                  } h-7 w-7 flex items-center justify-center rounded-full font-bold text-[0.7rem]  `}
                >
                  <p>{chat.sender}</p>
                </div>

                <div className="w-full text-[0.8rem] border-[2px] rounded-[10px] border-gray-400 border-opacity-[0.5]">
                  <TextMarkDown response={chat.message} />
                </div>
              </li>
            );
          })}
        </ul>
      </section>
      <form ref={form} onSubmit={handleChat}>
        <div className=" p-2 w-full bg-gray-700 flex items-center">
          <textarea
            type="text"
            placeholder="Type Here"
            className="w-full px-2 outline-none bg-transparent"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button type="submit" className="bg-green-400 px-2 rounded-md">
            Send
          </button>
        </div>
      </form>
    </main>
  );
};

export default Main;
