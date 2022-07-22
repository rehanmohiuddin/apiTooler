import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import CodeEditor from "@uiw/react-textarea-code-editor";
import useAxios from "../hooks/useAxios";
import useFetch from "../hooks/useFetch";
import { lib, inputs, inputType, Request } from "../constants";
import { getValueFromObject, isUrlValid } from "../util/hooks";
import useToast from "../hooks/useToast";

function Index() {
  const [activeText, setActiveText] = useState(inputs.authorization);
  const [activeLibrary, setActiveLibrary] = useState(lib.axios);
  const [showToast, setToast] = useToast();
  //   const [params, setParams] = useState<string>();
  //   const [headers, setHeaders] = useState<string>();
  const Axios = useAxios();
  const Fetch = useFetch();
  const [{ req, action, loading, data }, response] =
    activeLibrary === lib.axios ? Axios : Fetch;

  const renderOptionButtons = () => {
    const options = Object.keys(inputType);
    return options.map((key) => (
      <button
        onClick={() => setActiveText(key)}
        className={`outline-none p-2 rounded border border-solid border-white cursor-pointer ${
          key === activeText && "bg-slate-400"
        }`}
      >
        {key}
      </button>
    ));
  };

  const handleSend = () =>
    isUrlValid(data.url)
      ? req()
      : setToast({ message: "Invalid Url", type: "failure" });

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    action.setMethod(e.target.value);
  };

  const showStatus = () => (
    <div
      className={`${response.success.data && "text-green-500"} ${
        response.error.data && "text-red-500"
      } text-xl uppercase text-bolder`}
    >
      Status :
      {response.success.data
        ? `${response.success.status}`
        : `${response.error.status} (${JSON.stringify(response.error.data)})`}
    </div>
  );

  const isResponse = response.success.data || response.error.data;
  return (
    <Container loading={loading} showToast={showToast}>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex w-full justify-between items-center">
          <fieldset
            className={`font-poppins w-8/12 p-2 box-content ${
              !isUrlValid(data?.url) && "border border-solid border-red-400"
            }`}
          >
            <legend>URL</legend>
            <input
              onChange={(e) => action.url(e.target.value)}
              className={`w-full border-none outline-none font-poppins `}
              placeholder="Ex: https://www.google.com"
              value={data.url}
            />
          </fieldset>
          <select
            name="request"
            onChange={selectHandler}
            className="p-2 rounded border border-solid border-slate-300"
          >
            <option value={Request.GET}>GET</option>
            <option value={Request.POST}>POST</option>
            <option value={Request.PUT}>PUT</option>
            <option value={Request.PATCH}>PATCH</option>
            <option value={Request.DELETE}>DELETE</option>
          </select>
          <select
            name="library"
            className="p-2 rounded border border-solid border-slate-300"
            onChange={(e) => setActiveLibrary(e.target.value)}
          >
            <option value={lib.axios}>Axios</option>
            <option value={lib.fetch}>Fetch</option>
          </select>
          <button
            onClick={handleSend}
            className="outline-none p-2 rounded border border-solid border-white cursor-pointer bg-indigo-500 text-white w-24 h-12"
          >
            Send
          </button>
        </div>
        <div className="flex flex-col w-full justify-between gap-6">
          <div className="flex gap-8">
            <>
              {renderOptionButtons()}

              {isResponse && (
                <button
                  onClick={() => action.clearAll()}
                  className={`outline-none p-2 rounded border border-solid border-white cursor-pointer `}
                >
                  Clear All
                </button>
              )}
            </>
          </div>
          <CodeEditor
            value={
              isResponse
                ? JSON.stringify(response.success.data ?? response.error.data)
                : getValueFromObject(activeText, data)
            }
            contentEditable={false}
            className="overflow-auto h-80 box-content"
            readOnly={isResponse ? true : false}
            language="js"
            placeholder={inputType[activeText]}
            onChange={(evn) => action[activeText](evn.target.value)}
            padding={20}
            style={{
              width: "80%",
              fontSize: 12,
              backgroundColor: "#f5f5f5",
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
              overflow: "auto",
              color: "black",
            }}
          />
          {isResponse && showStatus()}
        </div>
      </div>
    </Container>
  );
}

export default Index;
