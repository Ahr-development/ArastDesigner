import { useEffect } from "react";
import { useSelector } from "react-redux";
import { InitializeSideBarIconContent } from "../../../../../js/Arast";
import { getScaledSize } from "../../../../../js/SetupEditor";




const IconTab = () => {

    const app = useSelector((state) => state.InitApp);

    useEffect(() => {
        InitializeSideBarIconContent()

        document.querySelector('.Arast-elements-grid').addEventListener('click', (event) => {
            // Ensure the clicked element matches the target criteria
            if (event.target.matches('.Arast-element > *:first-child')) {
                let element = event.target.parentElement;
                let svgUrl = element.dataset.elsource;

                /*         if (element.parentElement.id === 'Arast-icons-grid') {
                          const iconStyle = document.querySelector('#Arast-icon-style').value;
                          svgUrl = `${element.dataset.elsource}/${iconStyle}/24px.svg`;
                          console.log(svgUrl);
                        }
          
                     */
                svgUrl = `${element.dataset.elsource}/materialicons/24px.svg`;

                const loader = element.dataset.loader;
                if (loader === 'yes') {
                    document.querySelector('#Arast-canvas-loader').style.display = 'flex';
                }

                // Remove active class from all elements and add it to the clicked element
                const elements = document.querySelectorAll('.Arast-elements-grid .Arast-element');
                elements.forEach(el => el.classList.remove('active'));
                element.classList.add('active');

                fabric.loadSVGFromURL(svgUrl, (objects, options) => {
                    const svg = fabric.util.groupSVGElements(objects, options);

                    svg.set('originX', 'center');
                    svg.set('originY', 'center');
                    svg.set('left', getScaledSize()[0] / 2);
                    svg.set('top', getScaledSize()[1] / 2);
                    svg.set('objectType', 'element');
                    svg.set('gradientFill', 'none');

                    app.canvas.add(svg);
                    svg.scaleToWidth(getScaledSize()[0] / 8);

                    if (svg.isPartiallyOnScreen()) {
                        svg.scaleToHeight(getScaledSize()[1] / 8);
                    }

                    app.canvas.setActiveObject(svg);
                    app.canvas.requestRenderAll();
                    if (loader === 'yes') {
                    }
                }, function () { }, {
                    crossOrigin: 'anonymous'
                });

                app.canvas.fire('Arast:history', { type: 'element', text: ArastParams.added });
            }
        });
    }, [])

    return (<>
        <div id="Arast-all-icons" class="Arast-tab active">

            <div class="Arast-search-wrap">
                <input id="Arast-icon-search" type="search" class="Arast-form-field" placeholder="Enter a keyword..." autocomplete="off" />
                <span id="Arast-icon-search-icon" class="material-icons">search</span>
            </div>
            <div id="Arast-icons-grid" class="Arast-grid Arast-elements-grid four-column">
            </div>
            <div id="Arast-noicons" class="notice notice-warning">Nothing found.</div>
        </div>



    </>);
}

export default IconTab;