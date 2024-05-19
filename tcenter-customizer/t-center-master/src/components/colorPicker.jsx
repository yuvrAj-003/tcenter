
import state from "../config/store";
import { swatch } from "../assets";
function ColorPicker(){
    return (
        <div className="shadow-lg w-16 flex justify-center p-3 color-picker">
            <label htmlFor="color" className="cursor-pointer" title="choose color">
                <img src={swatch} className="h-8 w-8"/>
            </label>
            <input type="color" id="color" title="colorPick" className="w-0 h-0 bg-transparent cursor-pointer" 
            onInput={(e) => state.color = e.target.value} min="1" max="10"/>
        </div>
        

    );
}

export default ColorPicker;