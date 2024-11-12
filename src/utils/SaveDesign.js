import { SaveDesignService } from "../Services/designService";
import { store } from "../Store/Store";
import { adjustZoom } from "../js/SetupEditor";

const state = store.getState();
const app = state.InitApp;
const user = state.IUser;
const designManager = state.IDesignController;
const index = state.IIndex;

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

export const SaveDesign = async (designId) => {

    console.log(index);
    const designButton = document.getElementById("arast-save")
    designButton.style.backgroundColor = "yellow"
    designButton.textContent = "در حال ذخیره ..."
    designButton.style.color = "black"

    const formData = new FormData()
    const json = JSON.stringify(app.canvas.toJSON());
    const fileImage = app.canvas.toDataURL('image/png')
    const blob = await (await fetch(fileImage)).blob()

    formData.append('Stoken', user.ServerToken)
    formData.append('DesignId', designId)
    formData.append('Canvas', json)
    formData.append('Image', blob)
    formData.append('UserId', user.UserId)

    const { status } = await SaveDesignService(formData)

    if (status === 200) {
        designButton.style.backgroundColor = "green"
        designButton.textContent = "ذخیره شد"
        designButton.style.color = "white"
    }
    else {
        designButton.style.backgroundColor = "red"
        designButton.textContent = "ذخیره ناموفق"
        designButton.style.color = "white"

    }




}



export const debouncedSaveDesign = debounce(SaveDesign, 500)