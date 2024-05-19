import { fileIcon } from "../assets";
import { reader } from "../config/readFile";
import state from "../config/store";
function FilePicker(){
    return (
        <div className="shadow-lg p-3 w-16 flex justify-center file-picker">
            <label htmlFor="file" className="cursor-pointer" title="choose file">
                <img src={fileIcon} className="h-8 w-8"/>
            </label>
            <input type="file" id="file" accept="image/*" className="hidden" onInput={e =>  {
                    reader(e.target.files[0]);
                }
            } required/>
        </div>
        
    );
}

export default FilePicker;