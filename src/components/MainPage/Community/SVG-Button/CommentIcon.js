import React from "react";

function CommentIcon(props) {
  return (
    <button
      style={{
        backgroundColor: "white",
        borderColor: "transparent",
        outline: "none",
      }}
      onClick={props.comment}
    >
      <svg
        width="16"
        height="16"
        fill="currentColor"
        color="grey"
        viewBox="0 0 16 16"
      >
        <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
        <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
      </svg>
    </button>
  );
}

export default CommentIcon;
