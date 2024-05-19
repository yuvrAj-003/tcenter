import state from "../config/store";
import {
  ArrowUpFromLine,
  ArrowDownFromLine,
  ArrowLeftFromLine,
  ArrowRightFromLine,
} from "lucide-react";

function PosArrow({ dir, icon, customStyle }) {
  function handleClick() {
    switch (dir) {
      case "left":
        state.position[2] == 0.5
          ? (state.position[0] -= 0.004)
          : (state.position[0] += 0.004);
        break;
      case "right":
        state.position[2] == 0.5
          ? (state.position[0] += 0.004)
          : (state.position[0] -= 0.004);
        break;
      case "up":
        state.position[1] += 0.004;
        break;
      case "down":
        state.position[1] -= 0.004;
        break;
    }
  }
  return (
    <button className={customStyle} onClick={handleClick}>
      {icon}
    </button>
  );
}

function Position() {
  return (
    <div>
      <PosArrow
        customStyle="fixed top-20 left-2/4 -translate-x-2/4 w-10 h-10 sm:hidden"
        dir="up"
        icon={<ArrowUpFromLine />}
      />
      <PosArrow
        customStyle="fixed bottom-20 left-2/4 -translate-x-2/4 w-10 h-10 sm:hidden"
        dir="down"
        icon={<ArrowDownFromLine />}
      />
      <PosArrow
        customStyle="fixed top-2/4 left-20 -translate-y-2/4 w-10 h-10 sm:hidden"
        dir="left"
        icon={<ArrowLeftFromLine />}
      />
      <PosArrow
        customStyle="fixed top-2/4 right-20 -translate-y-2/4 w-10 h-10 sm:hidden"
        dir="right"
        icon={<ArrowRightFromLine />}
      />
    </div>
  );
}

export default Position;
