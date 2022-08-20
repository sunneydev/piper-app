import React from "react";
import { Image } from "@nextui-org/react";
import imoviesLogo from "../assets/imovies-logo.svg";

const IMovies: React.FC<{
  onClick?: () => {};
}> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#009C7C] p-4 rounded-xl cursor-pointer"
    >
      <Image src={imoviesLogo} height="20px" />
    </button>
  );
};

export default React.memo(IMovies);
