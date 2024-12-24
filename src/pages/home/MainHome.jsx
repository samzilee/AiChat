import React from "react";
import Header from "./components/Header";
import Background from "./components/Background";
import Main from "./components/Main";

const Home = () => {
  const userData = JSON.parse(localStorage.getItem("AiChatUserData"));
  if (!userData) {
    return (window.location.href = "/login");
  }
  const email = userData.providerUid;
  const userName = userData.userId;
  const sessionId = userData.$id;

  return (
    <main className="relative h-dvh text-white ">
      <Background />
      <div className="h-full overflow-hidden flex flex-col bg-gray-800 bg-opacity-[0.5]">
        <Header email={email} userName={userName} />
        <Main sessionId={sessionId} userId={userName} />
      </div>
    </main>
  );
};

export default Home;
