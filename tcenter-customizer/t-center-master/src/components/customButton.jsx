import state from "../config/store";
import { useSnapshot } from "valtio";
function CustomButton({title,handleClick}){
    const snap = useSnapshot(state);
    return (
        <div className="custom-btn">
            <button className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-yellow-400 text-black shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            type="button" onClick={() => snap.isOnline && !snap.isLoading && !snap.error.exists && handleClick()}>{title}</button> 
        </div>
    );
}

export default CustomButton;