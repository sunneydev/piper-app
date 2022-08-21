import React from "react";
import { Image } from "@nextui-org/react";
import imoviesLogo from "../assets/imovies-logo.svg";

const IMovies: React.FC<{
  onClick?: () => void;
}> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-[#009C7C] p-3 rounded-xl cursor-pointer outline-none"
    >
      <Image src={imoviesLogo} height="16px" />
    </button>
  );
};

export default React.memo(IMovies);
