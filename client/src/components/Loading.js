import React from "react";

let styleObj = {
  zIndex: 12,
  color: "#007bff",
  position: "absolute",
  top: "30%",
  left: "50%",
  margin: "-50px 0px 0px -50px"
};

const Loading = props => {
  let { isLoading } = props;
  return (
    <div className={isLoading ? "d-block" : "d-none"}>
      <i className="fa fa-spinner fa-spin fa-5x" style={styleObj}></i>
    </div>
  );
};

export default Loading;
