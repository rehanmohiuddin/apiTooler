import React, { useEffect, useState } from "react";
import { toastProp } from "../types/hooks";

function useToast() {
  const [showToast, setToast] = useState<toastProp>({
    message: null,
    type: "none",
  });

  useEffect(() => {
    showToast.message &&
      setTimeout(() => setToast({ message: null, type: "none" }), 2000);
  }, [showToast]);

  //   const setShowToast = ({
  //     message,
  //     type,
  //   }: {
  //     message: string;
  //     type: string;
  //   }) => {
  //     setToast({ message, type });
  //   };

  return <[toastProp, Function]>[showToast, setToast];
}

export default useToast;
