import React from "react";
import "./index.css";

function Index() {
  return (
    <div className="absolute  w-full h-full flex justify-center items-center z-40 popup-bg">
      <div className="my-loader bg-indigo-500 rounded">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Index;
