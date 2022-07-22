import axios from "axios";
import React, { useEffect, useState } from "react";
import { inputs, inputType } from "../constants";
import { configProp } from "../types/hooks";
import { paramsToQuery, parseParamsFromUrl, stringToJson } from "../util/hooks";

function useAxios() {
  const [response, setResponse] = useState<object | null>({ data: null });
  const [axiosConfig, setAxiosConfig] = useState<any>({
    data: null,
    status: "",
    url: "",
    headers: "Content-Type: application/json",
    method: "GET",
    Authorization: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<object | null>({ data: null });

  const request = async () => {
    setLoading(true);
    try {
      const resp = await axios({
        ...axiosConfig,
        data: JSON.parse(axiosConfig.data),
        headers: {
          ...stringToJson(axiosConfig.headers),
          Authorization: axiosConfig.Authorization,
        },
      });

      setResponse({ ...response, ...resp });
    } catch (e: any) {
      setError({
        ...error,
        ...e.response,
      });
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setResponse({ data: null });
    setError({ data: null });
    setAxiosConfig({
      ...axiosConfig,
      data: null,
      status: "",
      url: "",
      headers: "Content-Type: application/json",
      method: "GET",
    });
  };

  const setHeaders = (value: string) =>
    setAxiosConfig({
      ...axiosConfig,
      headers: value,
    });

  const setAuthorization = (value: string) => {
    setAxiosConfig({
      ...axiosConfig,
      Authorization: value,
    });
  };

  const setBody = (value: string) =>
    setAxiosConfig({
      ...axiosConfig,
      ...{ data: value },
    });

  const setParams = (param: string) =>
    setAxiosConfig({
      ...axiosConfig,
      url: paramsToQuery(param, axiosConfig.url),
    });

  const setUrl = (value: string) =>
    setAxiosConfig({ ...axiosConfig, url: value });

  const action = {
    [inputs.authorization]: setAuthorization,
    [inputs.data]: setBody,
    [inputs.headers]: setHeaders,
    [inputs.params]: setParams,
    clearAll: clearAll,
    url: setUrl,
    setMethod: (reqType: string) =>
      setAxiosConfig({ ...axiosConfig, method: reqType }),
  };

  const config: configProp = {
    req: request,
    action,
    loading,
    data: {
      ...axiosConfig,
      params: parseParamsFromUrl(axiosConfig.url),
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
