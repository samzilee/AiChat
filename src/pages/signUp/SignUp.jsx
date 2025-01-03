import React, { useRef, useState } from "react";
import signUpBg from "../../Assets/abstract-dark-blue-futuristic-digital-grid-background.jpg";
import logo from "../../Assets/user_7708436.png";
import { Link } from "react-router-dom";
import { signUpAppWrite } from "../../Utils/aut.utils";
import { LogInAppWrite } from "../../Utils/aut.utils";
import {
  createAttribute,
  createCollection,
  createDocuments,
} from "../../Utils/db";

const SignUp = () => {
  const [animation, setAnimation] = useState("translate-x-full opacity-0 ");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(null);
  const signUpBtn = useRef(null);

  const [progress, setProgress] = useState("");
  const [progressColor, setProgressColor] = useState("text-green-400");

  setTimeout(() => {
    setAnimation("translate-x-0 opacity-1 ");
    clearTimeout();
  }, 1000);

  const handleSignUp = async (e) => {
    signUpBtn.current.style.opacity = "0.2";
    signUpBtn.current.style.pointerEvent = "none";
    e.preventDefault();
    setProgressColor("text-green-400");
    try {
      setProgress("signing Up");
      const response = await signUpAppWrite(
        crypto.randomUUID(),
        email,
        password,
        userName
      );
      setProgress("signing Up...Done");
      logIn();
    } catch (error) {
      setProgress(error.toString());
      setProgressColor("text-red-400");
      signUpBtn.current.style.opacity = "";
      signUpBtn.current.style.pointerEvents = "";
    }
  };
  const logIn = async () => {
    try {
      const response = await LogInAppWrite(email, password);

      setProgress("createCollection");
      await createCollection(response.userId, response.providerUid);
      console.log("createCollection...Done");
      setProgress("creating Collection...Done");

      setProgress("createAttribute");
      await createAttribute(response.userId);
      console.log("createAttribute...Done");
      setProgress("creating Attribute...Done");

      setProgress("createDocuments");
      await createDocuments(response.userId);
      console.log("createDocuments...Done");
      setProgress("creating Documents...Done");

      setUserData(response);
    } catch (error) {
      setProgress(error.toString());
      setProgressColor("text-red-400");
      signUpBtn.current.style.opacity = "";
      signUpBtn.current.style.pointerEvents = "";
    }
  };

  if (userData !== null) {
    localStorage.setItem("AiChatUserData", JSON.stringify(userData));
    window.location.href = "/";
  }

  return (
    <form className="h-dvh relative text-white " onSubmit={handleSignUp}>
      <img
        src={signUpBg}
        alt="backGround"
        className="absolute h-full w-full object-cover z-[-1]"
      />

      <main className="flex items-center justify-center size-full overflow-hidden">
        <div
          className={`p-5 flex flex-col gap-2 transition-all duration-[0.5s] w-fit  ${animation}`}
        >
          <label
            className="flex items-center font-bold text-[1.4rem] gap-2"
            htmlFor="name"
          >
            <img src={logo} alt="logo" className="w-[40px]" /> Sign Up
          </label>

          <main className="flex flex-col gap-2 text-black font-mono  w-fit p-2">
            <section>
              <input
                type="text"
                placeholder="Create User Name"
                className="pl-2 outline-none rounded-sm w-[220px]"
                id="name"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </section>

            <section>
              <input
                type="email"
                placeholder="Enter Email"
                className="pl-2 outline-none rounded-sm w-[220px]"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </section>

            <section>
              <input
                type="password"
                placeholder="Create password"
                className="pl-2 outline-none rounded-sm w-[220px]"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </section>
          </main>
          <footer className="flex gap-5 items-center">
            <button
              className=" px-2 bg-blue-400 rounded-md font-semibold opacity-[0.9] hover:opacity-[1]"
              ref={signUpBtn}
            >
              Sign Up
            </button>
            <Link
              to="/login"
              className="text-[0.8rem] text-blue-400 font-bold opacity-[0.5] hover:opacity-[1] cursor-pointer"
            >
              Log In?
            </Link>
          </footer>
          <p
            className={`text-[0.6rem] text-red-400 font-bold ${progressColor}`}
          >
            {progress}
          </p>
        </div>
      </main>
    </form>
  );
};

export default SignUp;
