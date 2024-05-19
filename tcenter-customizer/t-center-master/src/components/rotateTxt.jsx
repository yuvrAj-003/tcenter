import state from "../config/store";
import { rotateLeft , rotateRight} from "../assets";
import { useRef, useState } from "react";


function Rotate({rotate, icon,title}){

    let [hold, setHold] = useState(null);

    

    function handleRotateInterval(){
        let inter;
        if(hold == null){
            inter = setInterval(() => {
                rotate == 'left' ? (state.rotation[2] += 0.02) : (state.rotation[2] -= 0.02)  
            }, 5) 
        }
        setHold(inter);
         
        
    }
    function handleStopRotate(e){
        clearInterval(hold);
        setHold(null);
    }
    return (
        <div className="flex items-center w-16 shadow-lg rotate-left">
                <button 
                className="bg-transparent outline-none border-none w-full h-full flex justify-center items-center" 
                onMouseDown={handleRotateInterval} 
                onMouseUp={handleStopRotate} 
                onMouseOut={handleStopRotate} 

                onTouchStart={handleRotateInterval}
                onTouchEnd={handleStopRotate}
                onTouchMove={handleStopRotate}
                onTouchCancel={handleStopRotate}
                onContextMenu={e => e.preventDefault()}
                title={title}
                >
                    <img src={icon} width="32" height="32" style={{cursor: "pointer"}}/>
                </button>
        </div>
    );
}
function RotateTxt(){
    // state.rotation[2] += 0.01
    return (
        <>
            <Rotate icon={rotateLeft} rotate='left' title="rotate left" />
            <Rotate icon={rotateRight} rotate='right' title="rotate right" />
        </>  
    );
}

export default RotateTxt;