import { CustomButton } from "../components";
import {
  ColorPicker,
  FilePicker,
  RangeTxt,
  InvertTxt,
  RotateTxt,
  Reset,
  Position,
} from "../components";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/config";

import state from "../config/store";

import CanvasBody from "../canvas";
import { useEffect } from "react";
import { getUser } from "../config/auth";
import { useParams } from "react-router-dom";

function Customizer() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getUser(id)
      .then((v) => {
        if (v != id) {
          navigate("/nopage");
        }
      })
      .catch((e) => {
        navigate("/nopage");
        console.log(e);
      });

    state.color = "yellow";
    state.position = [0, 0, 0];
    state.range = [0, 0, 0];
    state.rotation = [0, 0, 0];
    state.texture =
      "data:image/png;base64,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";
    // if (!user) {
    //   navigate("/nopage");
    // }
  }, []);

  // change position by selecting the key
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (!state.intro) {
        switch (e.key) {
          case "ArrowLeft":
            state.position[2] == 0.5
              ? (state.position[0] -= 0.004)
              : (state.position[0] += 0.004);
            break;
          case "ArrowRight":
            state.position[2] == 0.5
              ? (state.position[0] += 0.004)
              : (state.position[0] -= 0.004);
            break;
          case "ArrowUp":
            state.position[1] += 0.004;
            break;
          case "ArrowDown":
            state.position[1] -= 0.004;
            break;
        }
      }
    });
  }, []);

  return (
    <div>
      <div className="customizer">
        {/* side tabs */}
        {/* canvas  */}
        <div>
          <CanvasBody />
        </div>

        <div className="absolute bottom-0 left-0 flex justify-center w-full p-3 me-5 z-10">
          <ColorPicker />
          <FilePicker />
          <RangeTxt />
          <InvertTxt />
          <RotateTxt />
          <Reset />
          <Position />
        </div>

        {/* order button  */}
        <div className="absolute top-4 right-5">
          <CustomButton
            title="order now"
            handleClick={() => {
              navigate("/payment");
            }}
          />
        </div>

        {/* order button  */}
        <div className="absolute top-4 left-5">
          <CustomButton
            title="home"
            handleClick={() => {
              window.location.href = "http://localhost:5173";
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Customizer;
