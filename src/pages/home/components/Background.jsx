import React from "react";
import homebg from "../../../Assets/mainBg.jpg";
const Background = () => {
  return (
    <img
      src={homebg}
      alt="backgrond"
      className=" absolute h-full w-full z-[-1] object-cover"
    />
  );
};

export default Background;
