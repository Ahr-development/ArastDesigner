import { useEffect } from "react";
import { useSelector } from "react-redux";
import config from "../../../Services/config.json"
import SvgLoader from "../../Common/SVGLoader";


const Shape = ({mode}) => {

    const app = useSelector((state) => state.InitApp);
    const assets = useSelector((state) => state.IAssets);



    function addSVGPathToCanvas(svgPath) {

        fabric.loadSVGFromString(svgPath, (objects, options) => {
            // Handle loaded objects
            const svgObject = fabric.util.groupSVGElements(objects, options);
            // شیء SVG را به بوم اضافه کنید
            svgObject.set({
                left: 100, // موقعیت X
                top: 400, // موقعیت Y
                scaleX: 0.5, // مقیاس X
                scaleY: 0.5 // مقیاس Y
            });
            app.canvas.add(svgObject);
         
            app.canvas.requestRenderAll()
        });
    }

    const handleSvgClick = (svgContent) => {
        fabric.loadSVGFromString(svgContent, function(objects, options) {
            const svgGroup = fabric.util.groupSVGElements(objects, options);
            svgGroup.scaleToWidth(200); // تنظیم اندازه SVG (اختیاری)
            svgGroup.scaleToHeight(200);
            app.canvas.add(svgGroup);
            app.canvas.renderAll();
        });
    };

    useEffect(() => {

        const Shapes = document.querySelectorAll('.Arast-shape svg');
        for (const shape of Shapes) {
            shape.addEventListener('click', function () {
                // Get the SVG element from the div
                const svgString = shape.outerHTML;
                addSVGPathToCanvas(svgString)
            });

        }
        // Cleanup function
        return () => {
            for (const shape of Shapes) {
                shape.removeEventListener('click', function () {
                    // Get the SVG element from the div
                    const svgString = shape.outerHTML;
                    addSVGPathToCanvas(svgString)
                });
            }

        };
    }, [])




    return (<>
<div id={mode != null ? ("") : ("Arast-icon-panel")}>
            <div id={mode != null ? ("") : ("Arast-icon-panel-inner")}>

                <div id="Arast-shapes" class="Arast-icon-panel-content ">
                    {/*      <div class="Arast-select-btn-set">
                <select id="Arast-shape-select" class="Arast-select" autocomplete="off">
                    <option value="none" selected>Select Shape</option>
                    <option value="circle">Circle</option>
                    <option value="ellipse">Ellipse</option>
                    <option value="square">Square</option>
                    <option value="rectangle">Rectangle</option>
                    <option value="triangle">Triangle</option>
                    <option value="trapezoid">Trapezoid</option>
                    <option value="emerald">Emerald</option>
                    <option value="star">Star</option>
                </select>
                <button id="Arast-shape-add" class="Arast-btn primary" autocomplete="off" disabled><span class="material-icons">add_circle</span></button>



            </div> */}

                    <div id="Arast-all-shapes" class="Arast-tab active">
                        <div id="Arast-shapes-grid" class="Arast-grid Arast-shapes-grid four-column">

                            {
                                assets.shapes.map((shape,index) => (
                                    <div class="Arast-shape" data-id="circle" title="Circle"> 
                                        <SvgLoader url={config.staticFile + shape.AssetsFileName} key={index} onClick={handleSvgClick}/>
                                    </div>
                                ))
                            }

                            <div class="Arast-shape" data-id="ellipse" title="Ellipse"> <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="200" height="200" viewBox="0 0 200 200" xml:space="preserve">
                                <g transform="matrix(1.28 0 0 1.28 100 100)" id="1703336889308">
                                    <ellipse className="test-style" vector-effect="non-scaling-stroke" cx="0" cy="0" rx="75" ry="50"></ellipse>
                                </g>
                            </svg>
                            </div>
                            <div class="Arast-shape" data-id="square" title="Square"> <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="200" height="200" viewBox="0 0 200 200" xml:space="preserve">
                                <g transform="matrix(1.92 0 0 1.92 100 100)" id="1703336967063">
                                    <rect className="test-style" vector-effect="non-scaling-stroke" x="-50" y="-50" rx="0" ry="0" width="100" height="100"></rect>
                                </g>
                            </svg>
                            </div>
                            <div class="Arast-shape" data-id="rectangle" title="Rectangle"> <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="200" height="200" viewBox="0 0 200 200" xml:space="preserve">
                                <g transform="matrix(0.96 0 0 0.96 100 100)" id="1703336994136">
                                    <rect className="test-style" vector-effect="non-scaling-stroke" x="-100" y="-75" rx="0" ry="0" width="200" height="150"></rect>
                                </g>
                            </svg>
                            </div>

                            <div class="Arast-shape" data-id="customShape" title="Custom Shape">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="3672.96 3730.79 609.51 810.66" width="609.51pt" height="810.66pt">
                                    <path d=" M 4211.52 3756.33 C 4236.6 3756.33 4256.93 3776.66 4256.93 3801.74 L 4256.93 4236.69 C 4256.93 4390.89 4131.92 4515.9 3977.71 4515.9 L 3977.71 4515.9 C 3823.51 4515.9 3698.5 4390.89 3698.5 4236.69 L 3698.5 3801.74 C 3698.5 3776.66 3718.83 3756.33 3743.91 3756.33 L 4211.52 3756.33 Z  M 4265.44 4236.69 C 4265.44 4395.34 4136.37 4524.42 3977.71 4524.42 C 3819.06 4524.42 3689.99 4395.34 3689.99 4236.69 L 3689.99 3801.74 C 3689.99 3772.01 3714.17 3747.82 3743.91 3747.82 L 4211.52 3747.82 C 4241.25 3747.82 4265.44 3772.01 4265.44 3801.74 L 4265.44 4236.69 Z  M 4211.52 3730.79 L 3743.91 3730.79 C 3704.79 3730.79 3672.96 3762.62 3672.96 3801.74 L 3672.96 4236.69 C 3672.96 4404.73 3809.67 4541.45 3977.71 4541.45 C 4145.76 4541.45 4282.47 4404.73 4282.47 4236.69 L 4282.47 3801.74 C 4282.47 3762.62 4250.64 3730.79 4211.52 3730.79 Z " fill="rgb(255,255,255)"></path>
                                </svg>
                            </div>

                        </div>
                        <button id="Arast-shape-loadmore" type="button" class="Arast-btn primary Arast-lg-btn btn-full">Load more</button>
                    </div>



                    {/* 
            <div id="Arast-shape-settings" class="Arast-sub-settings">
                <div class="Arast-control-wrap">
                    <label class="Arast-control-label">Fill Style</label>
                    <div class="Arast-control">
                        <select id="Arast-shape-gradient" class="Arast-select" autocomplete="off">
                            <option value="none" selected>Solid Color</option>
                            <option value="vertical">Vertical Gradient</option>
                            <option value="horizontal">Horizontal Gradient</option>
                        </select>
                    </div>
                </div>
                <div id="shape-gradient-settings">
                    <div class="Arast-control-wrap control-text-color">
                        <label class="Arast-control-label">Color 1</label>
                        <div class="Arast-control">
                            <input id="shape-gradient-color-1" type="text" class="Arast-colorpicker disallow-empty" autocomplete="off" value="#9C27B0" />
                        </div>
                    </div>
                    <div class="Arast-control-wrap control-text-color">
                        <label class="Arast-control-label">Color 2</label>
                        <div class="Arast-control">
                            <input id="shape-gradient-color-2" type="text" class="Arast-colorpicker disallow-empty" autocomplete="off" value="#000000" />
                        </div>
                    </div>
                    <div class="Arast-control-wrap control-text-color">
                        <label class="Arast-control-label">Color 3</label>
                        <div class="Arast-control">
                            <input id="shape-gradient-color-3" type="text" class="Arast-colorpicker allow-empty" autocomplete="off" value="" />
                        </div>
                    </div>
                    <div class="Arast-control-wrap control-text-color">
                        <label class="Arast-control-label">Color 4</label>
                        <div class="Arast-control">
                            <input id="shape-gradient-color-4" type="text" class="Arast-colorpicker allow-empty" autocomplete="off" value="" />
                        </div>
                    </div>
                </div>
                <div id="shape-fill-color" class="Arast-control-wrap">
                    <label class="Arast-control-label">Fill Color</label>
                    <div class="Arast-control">
                        <input id="Arast-shape-color" type="text" class="Arast-colorpicker allow-empty" autocomplete="off" value="#fff" />
                    </div>
                </div>
                <div class="Arast-control-wrap">
                    <label class="Arast-control-label">Outline Size</label>
                    <div class="Arast-control">
                        <input id="shape-outline-width" class="Arast-form-field" type="number" value="0" data-min="0" data-max="1000" step="1" autocomplete="off" />
                    </div>
                </div>
                <div class="Arast-control-wrap">
                    <label class="Arast-control-label">Outline Color</label>
                    <div class="Arast-control">
                        <input id="shape-outline-color" type="text" class="Arast-colorpicker disallow-empty" autocomplete="off" value="#000000" />
                    </div>
                </div>
                <div class="Arast-control-wrap conditional">
                    <label class="Arast-control-label">Shadow</label>
                    <div class="Arast-control Arast-toggle-control">
                        <label class="Arast-toggle">
                            <input id="Arast-shape-shadow" class="Arast-toggle-checkbox" data-conditional="#shape-shadow-settings" type="checkbox" autocomplete="off" />
                            <div class="Arast-toggle-switch"></div>
                        </label>
                    </div>
                </div>
                <div id="shape-shadow-settings" class="d-none conditional-settings">
                    <div class="Arast-control-wrap">
                        <label class="Arast-control-label">Shadow Color</label>
                        <div class="Arast-control">
                            <input id="shape-shadow-color" type="text" class="Arast-colorpicker disallow-empty" autocomplete="off" value="#000" />
                        </div>
                    </div>
                    <div class="Arast-control-wrap">
                        <label class="Arast-control-label">Shadow Blur</label>
                        <div class="Arast-control">
                            <input id="shape-shadow-blur" class="Arast-form-field" type="number" value="5" step="1" autocomplete="off" />
                        </div>
                    </div>
                    <div class="Arast-control-wrap">
                        <label class="Arast-control-label">Offset X</label>
                        <div class="Arast-control">
                            <input id="shape-shadow-offset-x" class="Arast-form-field" type="number" value="5" step="1" autocomplete="off" />
                        </div>
                    </div>
                    <div class="Arast-control-wrap">
                        <label class="Arast-control-label">Offset Y</label>
                        <div class="Arast-control">
                            <input id="shape-shadow-offset-y" class="Arast-form-field" type="number" value="5" step="1" autocomplete="off" />
                        </div>
                    </div>
                </div>
                <hr />
                <div class="Arast-control-wrap label-block">
                    <div class="Arast-control">
                        <div class="Arast-btn-group icon-group">
                            <button type="button" class="Arast-horizontal-center Arast-btn tooltip tooltip-top" data-title="Horizontal Align Center"><span class="material-icons">align_horizontal_center</span></button>
                            <button type="button" class="Arast-vertical-center Arast-btn tooltip tooltip-top" data-title="Vertical Align Center"><span class="material-icons">vertical_align_center</span></button>
                        </div>
                    </div>
                </div>
                <div class="Arast-control-wrap label-block">
                    <label class="Arast-control-label slider-label">Opacity<span>1</span></label>
                    <div class="Arast-control">
                        <input id="shape-opacity" type="range" min="0" max="1" value="1" step="0.1" class="Arast-slider" autocomplete="off" />
                    </div>
                </div>
                <div class="Arast-control-wrap label-block">
                    <label class="Arast-control-label slider-label">Skew X<span>0</span></label>
                    <div class="Arast-control">
                        <input id="shape-skew-x" type="range" min="0" max="180" value="0" step="1" class="Arast-slider" autocomplete="off" />
                    </div>
                </div>
                <div class="Arast-control-wrap label-block">
                    <label class="Arast-control-label slider-label">Skew Y<span>0</span></label>
                    <div class="Arast-control">
                        <input id="shape-skew-y" type="range" min="0" max="180" value="0" step="1" class="Arast-slider" autocomplete="off" />
                    </div>
                </div>
                <div class="Arast-control-wrap label-block">
                    <label class="Arast-control-label slider-label">Rotate<span>0</span></label>
                    <div class="Arast-control">
                        <input id="shape-rotate" type="range" min="0" max="360" value="0" step="1" class="Arast-slider" autocomplete="off" />
                    </div>
                </div>
                <div id="shape-custom-width-wrap">
                    <div class="Arast-control-wrap">
                        <label class="Arast-control-label">Custom Width</label>
                        <div class="Arast-control">
                            <input id="shape-custom-width" class="Arast-form-field" type="number" value="" data-min="0" data-max="10000" step="1" autocomplete="off" />
                        </div>
                    </div>
                    <div class="Arast-control-wrap">
                        <label class="Arast-control-label">Custom Height</label>
                        <div class="Arast-control">
                            <input id="shape-custom-height" class="Arast-form-field" type="number" value="" data-min="0" data-max="10000" step="1" autocomplete="off" />
                        </div>
                    </div>
                    <div class="Arast-control-wrap label-block">
                        <label class="Arast-control-label">Aspect Ratio</label>
                        <div class="Arast-control">
                            <div class="Arast-aspect-ratio">
                                <input id="Arast-shape-ratio-w" class="Arast-form-field" type="number" value="12" autocomplete="off" />
                                <span class="material-icons">clear</span>
                                <input id="Arast-shape-ratio-h" class="Arast-form-field" type="number" value="16" autocomplete="off" />
                                <button id="Arast-shape-ratio-lock" type="button" class="Arast-btn Arast-lock-unlock"><span class="material-icons">lock_open</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
                </div>

            </div>
        </div>


    </>);
}

export default Shape;