const inputs = {
  authorization: "Authorization",
  data: "body",
  headers: "headers",
  params: "Params",
};
const lib: { [key: string]: string } = {
  axios: "Axios",
  fetch: "Fetch",
};

const inputType = {
  [inputs.authorization]: "Bearer token",
  [inputs.data]: "{key : value}",
  [inputs.headers]:
    "Cache-Control: no-cache, no-store, must-revalidate \n Pragma: no-cache \n Expires: 0",
  [inputs.params]: "q=hello \nid=123",
};

const Request = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
  PATCH: "patch",
};

export { inputs, lib, inputType, Request };
