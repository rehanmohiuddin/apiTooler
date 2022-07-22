import React from "react";
import Header from "../Header";
import Loader from "../Loader";
import Toast from "../Toast";

type Props = {
  children: JSX.Element;
  loading?: boolean;
  showToast: {
    message: string | null;
    type: string;
  };
};

const Index: React.FC<Props> = ({ children, loading, showToast }) => {
  return (
    <>
      {loading && <Loader />}
      <Header />
      <div className="flex-col p-2">{children}</div>
      {showToast.message && (
        <Toast message={showToast.message} type={showToast.type} />
      )}
    </>
  );
};

export default Index;
