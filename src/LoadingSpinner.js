import React from "react";

import "./LoadingSpinner.css";

export default function LoadingSpinner(props) {
  const { color = "white" } = props;

  return (
    <div className={`lds-ellipsis ${color}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
