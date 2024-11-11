import { store } from "../Store/Store";
import { Sortable } from 'sortablejs';
const state = store.getState();
const app = state.InitApp;
const settings = state.ISettings;







export const InitializeSideBarIconContent = () => {
    fetch('json/material-icons.json')
        .then(response => response.json())
        .then(fonts => {
            for (let i = 0; i < fonts.categories.length; i++) {
                const item = fonts.categories[i];
                for (let ii = 0; ii < item.icons.length; ii++) {
                    const url = '/files/icons/' + item.icons[ii].group_id + '/' + item.icons[ii].ligature;
                    const icon = document.createElement('div');
                    icon.classList.add('Arast-element', 'add-element');
                    icon.dataset.elsource = url;
                    icon.dataset.loader = 'no';
                    icon.title = item.icons[ii].name;
                    const iconContent = document.createElement('span');
                    iconContent.classList.add('material-icons');
                    iconContent.textContent = item.icons[ii].ligature;

                    icon.appendChild(iconContent);
                    document.querySelector('#Arast-icons .Arast-grid').appendChild(icon);
                }
            }

        })
        .catch(error => {
            console.error('Error fetching icons:', error);
        });

}



export const InitAccordions = () => {

    /* Accordion */
    document.querySelectorAll(".Arast-icon-panel-content ul.Arast-accordion > li > a").forEach(function (link) {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const parent = this.parentNode.parentNode;

            // Close all siblings
            for (const sibling of parent.querySelectorAll("li")) {
                sibling.classList.remove("opened");
            }

            // Toggle current element's opened state
            this.parentNode.classList.toggle("opened");
        });
    });



}






export function setFileName(fileName = new Date().getTime(), fileExtention = 'jpeg') {
    // Standardize file extension (lowercase 'jpeg' for consistency)
    fileExtention = fileExtention.toLowerCase() === 'jpg' ? 'jpeg' : fileExtention;

    // Assuming selector is a DOM element or jQuery object
    const fileNameInput = document.getElementById('.Arast-file-name');
    const formatSelect = document.getElementById('#Arast-save-img-format');

    // Update input value and default data attribute (if applicable)
    fileNameInput.val(fileName);
    if (fileNameInput.data) {  // Check if data method exists
        fileNameInput.data('default', fileName);
    }

    // Update format selection value and trigger change event
    formatSelect.val(fileExtention);
    formatSelect.trigger('change');
}











