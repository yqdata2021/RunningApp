import React from "react";

function HeartFillIcon(props) {
  function onClickHandler() {
    props.unlike();
  }
  return (
    <button
      style={{
        backgroundColor: "white",
        borderColor: "transparent",
        outline: "none",
      }}
      onClick={onClickHandler}
    >
      <svg
        width="16"
        height="16"
        color="red"
        fill="currentColor"
        viewBox="0 0 16 16"
      >
        <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
      </svg>
    </button>
  );
}

export default HeartFillIcon;
