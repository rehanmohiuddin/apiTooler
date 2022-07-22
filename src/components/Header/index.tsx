import React from "react";
import { Link } from "react-router-dom";
import headerImg from "../../Assets/logo.png";

function Index() {
  return (
    <div className="flex w-full p-2 box-border bg-sky-600 justify-between">
      <Link to={"/"}>
        <img className="header-main-logo w-16" src={headerImg} />
      </Link>
      <div className="flex gap-3 items-center">
        <Link className="text-white text no-underline" to={"/"}>
          Home
        </Link>
        <input
          className="outline-none w-56 h-8 border-solid border-1 border-indigo-100 font-poppins p-1 rounded"
          placeholder="Search API"
        />
      </div>
    </div>
  );
}

export default Index;
