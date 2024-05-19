import state from "../config/store";
function RangeTxt(){
    return (
        <div className="cursor-pointer flex items-center w-32 shadow-lg p-3 range">
            <input type="range" title="set size" className="appearance-none w-full h-0.5 bg-gray-100 cursor-pointer" onInput={(e) => state.range = [e.target.value/100, e.target.value/100, 1]}/>
        </div>
    );
}

export default RangeTxt;