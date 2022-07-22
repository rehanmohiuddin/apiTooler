import React from "react";

function Index({
  message = "hello",
  type = "none",
}: {
  message: string | null;
  type: string;
}) {
  const messageColor: { [key: string]: string } = {
    success: "bg-green-500 text-white",
    failure: "bg-red-500 text-white",
    none: "bg-white text-black ",
  };
  return (
    <div
      className={`absolute top-4 p-2 right-4 rounded shadow-lg shadow-slate-400 ${messageColor[type]}`}
    >
      {message}
    </div>
  );
}

export default Index;
