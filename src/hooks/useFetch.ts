import axios from "axios";
import React, { useEffect, useState } from "react";
import { inputs, inputType } from "../constants";
import { configProp } from "../types/hooks";
import { paramsToQuery, parseParamsFromUrl, stringToJson } from "../util/hooks";

function useAxios() {
  const [response, setResponse] = useState<object | null>({ data: null });
  const [params, setparams] = useState<string>("");
  const [fetchConfig, setFetchConfig] = useState<any>({
    body: null,
    status: "",
    url: "",
    headers: "Content-Type: application/json",
    Authorization: "",
    method: "GET",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<object | null>({ data: null });

  const request = async () => {
    setLoading(true);
    try {
      const fetchObj = {
        ...fetchConfig,
        headers: {
          Authorization: fetchConfig.Authorization,
          ...stringToJson(fetchConfig.headers),
        },
      };
      if (fetchConfig.body)
        fetchConfig.body = JSON.stringify(JSON.parse(fetchConfig.body));
      const resp = await fetch(fetchConfig.url, fetchObj);
      const respObj = { status: resp.status };
      setResponse({ ...respObj, data: await resp.json() });
    } catch (e: any) {
      console.error({ e });
      setError({ data: e });
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setResponse({ data: null });
    setError({ data: null });
    setFetchConfig({
      ...fetchConfig,
      body: null,
      status: "",
      url: "",
      headers: "Content-Type: application/json",
      method: "GET",
    });
  };

  const setHeaders = (value: string) => {
    setFetchConfig({
      ...fetchConfig,
      headers: value,
    });
  };

  const setAuthorization = (value: string) =>
    setFetchConfig({
      ...fetchConfig,
      Authorization: value,
    });

  const setBody = (value: string) =>
    setFetchConfig({
      ...fetchConfig,
      body: value,
    });

  const setParams = (param: string) =>
    setFetchConfig({
      ...fetchConfig,
      url: paramsToQuery(param, fetchConfig.url),
    });

  const setUrl = (value: string) =>
    setFetchConfig({ ...fetchConfig, url: value });

  const action = {
    [inputs.authorization]: setAuthorization,
    [inputs.data]: setBody,
    [inputs.headers]: setHeaders,
    [inputs.params]: setParams,
    clearAll: clearAll,
    url: setUrl,
    setMethod: (reqType: string) =>
      setFetchConfig({ ...fetchConfig, method: reqType }),
  };
  const config: configProp = {
    req: request,
    action,
    loading,
    data: {
      ...fetchConfig,
      params: parseParamsFromUrl(fetchConfig.url),
    },
  };

  return <
    [
      configProp,
      {
        success: { status: number; data: string };
        error: { status: number; data: string };
      }
    ]
  >[config, { success: response, error: error }];
}

export default useAxios;
