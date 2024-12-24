import React, { useRef, useState } from "react";
import signUpBg from "../../Assets/abstract-digital-grid-black-background.jpg";
import logo from "../../Assets/user_7708436.png";
import { Link } from "react-router-dom";
import { LogInAppWrite } from "../../Utils/aut.utils";

const LogIn = () => {
  const [animation, setAnimation] = useState("translate-x-full opacity-0 ");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const logInBtn = useRef(null);

  const locaData = localStorage.getItem("AiChatUserData");

  if (locaData) {
    window.location.href = "/";
  }

  setTimeout(() => {
    setAnimation("translate-x-0 opacity-1 ");
    clearTimeout();
  }, 1000);

  const handleLogIn = async (e) => {
    e.preventDefault();

    logInBtn.current.style.opacity = "0.2";
    logInBtn.current.style.pointerEvent = "none";
    try {
      const response = await LogInAppWrite(email, password);
      console.log("LogInAppWrite...Done");
      setUserData(response);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.toString());
      logInBtn.current.style.opacity = "";
      logInBtn.current.style.pointerEvent = "";
    }
  };

  if (userData !== null) {
    localStorage.setItem("AiChatUserData", JSON.stringify(userData));
  }

  return (
    <form className="h-dvh relative text-white" onSubmit={handleLogIn}>
      <img
        src={signUpBg}
        alt="backGround"
        className="absolute h-full w-full object-cover z-[-1]"
      />

      <main className="flex items-center justify-center size-full overflow-hidden ">
        <div
          className={`p-5 flex flex-col gap-2  w-fit transition-all duration-[0.5s]  ${animation}`}
        >
          <label
            className="flex items-center font-bold text-[1.4rem] gap-2"
            htmlFor="email"
          >
            <img src={logo} alt="logo" className="w-[40px]" /> Log In
          </label>

          <main className="flex flex-col gap-2 text-black font-mono w-fit p-2">
            <section>
              <input
                type="email"
                placeholder="Enter Email"
                className="pl-2 outline-none rounded-sm"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </section>

            <section>
              <input
                type="password"
                placeholder="Enter Password"
                className="pl-2 outline-none rounded-sm"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </section>
          </main>
          <footer className="flex gap-5 items-center">
            <button
              className=" px-2 bg-blue-400 rounded-md font-semibold opacity-[0.9] hover:opacity-[1]"
              ref={logInBtn}
            >
              Log In
            </button>
            <Link
              to="/signUp"
              className="text-[0.8rem] text-blue-400 font-bold opacity-[0.5] hover:opacity-[1] cursor-pointer"
            >
              Sign Up?
            </Link>
          </footer>

          <p className="text-[0.5rem] text-red-400 font-bold">{errorMessage}</p>
        </div>
      </main>
    </form>
  );
};

export default LogIn;
