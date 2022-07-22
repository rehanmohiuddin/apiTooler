import { objStringProp } from "../types/hooks";

const stringToJson = (str: string) => {
  const strArr = str.split("\n");
  const res: { [key: string]: string } = {};
  strArr.forEach((str) => {
    const [key, val] = str.split(":");
    if (key && val) res[key.trim()] = val.trim();
  });
  return res;
};

const paramsToQuery = (str: string, url: string) => {
  const strArr = str.split("\n");
  let newUrl = url.split("?")[0],
    paramsUrl = "";
  const res: { [key: string]: string } = {};
  strArr.forEach((str, index) => {
    const [key, val] = str.split("=");
    if (index > 0) paramsUrl = paramsUrl + "&";
    if (val) {
      res[key] = val;
      paramsUrl = paramsUrl + `${key}=${res[key]}`;
    }
  });
  return `${newUrl}?${paramsUrl}`;
};

const parseParamsFromUrl = (url: string) => {
  const params = url.split("?");
  let res = "";
  params.forEach((param) => {
    res = res + param + "\n";
  });
  return res;
};

const parseHeaderFromJson = (header: { [key: string]: string }) => {
  let res = "";
  Object.keys(header).forEach((key) => {
    res = res + `${key}:${header[key]} \n`;
  });
  return res;
};

const getValueFromObject: Function & object = (
  key: string,
  obj: objStringProp
) => {
  for (let Key of Object.keys(obj)) {
    if (Key === key) return obj[key];
    else if (obj[Key] && typeof obj[Key] === "object")
      return getValueFromObject(key, obj[Key]);
  }
  return "";
};

const isUrlValid = (url: string) =>
  url.length > 0 &&
  url.match(
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
  );

export {
  stringToJson,
  paramsToQuery,
  parseParamsFromUrl,
  parseHeaderFromJson,
  getValueFromObject,
  isUrlValid,
};
