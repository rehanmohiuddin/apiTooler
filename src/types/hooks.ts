export type configProp = {
  req: Function;
  action: {
    [key: string]: Function;
  };
  loading: boolean;
  data: dProp & dataProp;
};

export type dataProp = {
  data: null | any;
  status: string;
  url: string;
  headers: any;
  method: string;
  params: string;
};

export type objStringProp = {
  [key: string]: string;
};

type dProp = { [key: string]: string };

export type toastProp = {
  message: string | null;
  type: string;
};
