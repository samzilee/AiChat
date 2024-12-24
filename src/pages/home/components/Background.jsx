import React from "react";
import homebg from "../../../Assets/abstract-textured-backgound.jpg";
const Background = () => {
  return (
    <img
      src={homebg}
      alt="backgrond"
      className=" absolute h-full w-full z-[-1]"
    />
  );
};

export default Background;
