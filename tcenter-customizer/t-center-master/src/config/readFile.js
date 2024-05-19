import state from "./store";
// export const downloadCanvasToImage = () => {
//   const canvas = document.querySelector("canvas");
//   const dataURL = canvas.toDataURL();
//   const link = document.createElement("a");

//   link.href = dataURL;
//   link.download = "canvas.png";
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
// };

// file reader
export const reader = (file) => {
  try {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (e) => {
      let dataURL = e.target.result;

      if (dataURL.length > 100000) {
        state.error.exists = true;
        state.error.name = "file size exceding 100kb";
      } else {
        if (dataURL.startsWith("data:image")) {
          state.texture = dataURL;
          state.error.exists = false;
        }
      }
    };
  } catch (e) {
    if (e.name != "TypeError") {
      throw Error(e.name);
    } else {
      state.error.exists = true;
      state.error.name = "file error";
    }
  }
};
