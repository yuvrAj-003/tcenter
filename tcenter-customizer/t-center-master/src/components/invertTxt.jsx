import { useState } from "react";
import { invert } from "../assets";
import state from "../config/store";

function InvertTxt() {
  const [inverted, setInverted] = useState(false);

  state.position[2] = inverted ? -0.5 : 0.5;
  state.rotation[1] = inverted ? Math.PI : 0;
  return (
    <div className="flex items-center w-16 shadow-lg invert-btn">
      <button
        className="bg-transparent outline-none border-none w-full h-full flex justify-center items-center"
        onMouseDown={() => {
          setInverted(!inverted);
        }}
        title="invert"
      >
        <img src={invert} width="32" height="32" />
      </button>
    </div>
  );
}

export default InvertTxt;
