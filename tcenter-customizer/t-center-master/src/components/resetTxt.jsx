import { reset } from "../assets";
import state from "../config/store";
function Reset(){

    return (
        <div className="flex items-center w-16 shadow-lg invert-btn">
            <button className="bg-transparent outline-none border-none w-full h-full flex justify-center items-center" onMouseDown={() => {
                state.position[0] = 0
                state.position[1] = 0
                state.rotation[2] = 0
            }} title="reset">
                <img src={reset} width="32" height="32"/>
            </button>
        </div>
    );
}

export default Reset;