

const Image = () => {
    return (<>
        <div id="Arast-icon-panel">
            <div id="Arast-icon-panel-inner">
                <div id="Arast-image" class="Arast-icon-panel-content ">
                    <div class="Arast-tabs">
                        <ul class="Arast-tabs-menu">
                            <li id="Arast-img-mode" class="active" data-target="#Arast-image-mode">Image</li>
                            <li data-target="#Arast-overlay-image-mode">Overlay Image</li>
                        </ul>
                        <div id="Arast-image-mode" class="Arast-tab active">
                            <div class="Arast-file-field">
                                <input type="file" name="Arast-file" id="Arast-img-upload" class="Arast-hidden-file" accept="image/png, image/jpeg" />
                                <label for="Arast-img-upload" class="Arast-btn primary Arast-lg-btn btn-full"><span class="material-icons">upload</span><span>Upload from computer</span></label>
                            </div>
                            <button id="Arast-img-media-library" type="button" class="Arast-btn primary Arast-lg-btn btn-full Arast-modal-open" data-target="#modal-media-library"><span class="material-icons">photo_library</span>Select From Media Library</button>
                            <div id="Arast-image-settings" class="Arast-sub-settings">
                                <div class="Arast-control-wrap">
                                    <label class="Arast-control-label">Border Width</label>
                                    <div class="Arast-control">
                                        <input id="img-border-width" class="Arast-form-field" type="number" value="0" data-min="0" data-max="1000" step="1" autocomplete="off" />
                                    </div>
                                </div>
                                <div class="Arast-control-wrap">
                                    <label class="Arast-control-label">Border Color</label>
                                    <div class="Arast-control">
                                        <input id="img-border-color" type="text" class="Arast-colorpicker disallow-empty" autocomplete="off" value="#ffffff" />
                                    </div>
                                </div>
                                <div class="Arast-control-wrap label-block">
                                    <label class="Arast-control-label slider-label">Rounded Corners<span>0</span></label>
                                    <div class="Arast-control">
                                        <input id="img-border-radius" type="range" min="0" max="1000" value="0" step="1" class="Arast-slider" autocomplete="off" />
                                    </div>
                                </div>
                                <div class="Arast-control-wrap conditional">
                                    <label class="Arast-control-label">Shadow</label>
                                    <div class="Arast-control Arast-toggle-control">
                                        <label class="Arast-toggle">
                                            <input id="Arast-image-shadow" class="Arast-toggle-checkbox" data-conditional="#image-shadow-settings" type="checkbox" autocomplete="off" />
                                            <div class="Arast-toggle-switch"></div>
                                        </label>
                                    </div>
                                </div>
                                <div id="image-shadow-settings" class="d-none conditional-settings">
                                    <div class="Arast-control-wrap">
                                        <label class="Arast-control-label">Shadow Color</label>
                                        <div class="Arast-control">
                                            <input id="image-shadow-color" type="text" class="Arast-colorpicker disallow-empty" autocomplete="off" value="#000" />
                                        </div>
                                    </div>
                                    <div class="Arast-control-wrap">
                                        <label class="Arast-control-label">Shadow Blur</label>
                                        <div class="Arast-control">
                                            <input id="image-shadow-blur" class="Arast-form-field" type="number" value="5" step="1" autocomplete="off" />
                                        </div>
                                    </div>
                                    <div class="Arast-control-wrap">
                                        <label class="Arast-control-label">Offset X</label>
                                        <div class="Arast-control">
                                            <input id="image-shadow-offset-x" class="Arast-form-field" type="number" value="5" step="1" autocomplete="off" />
                                        </div>
                                    </div>
                                    <div class="Arast-control-wrap">
                                        <label class="Arast-control-label">Offset Y</label>
                                        <div class="Arast-control">
                                            <input id="image-shadow-offset-y" class="Arast-form-field" type="number" value="5" step="1" autocomplete="off" />
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div class="Arast-control-wrap label-block">
                                    <div class="Arast-control">
                                        <div class="Arast-btn-group icon-group">
                                            <button id="img-flip-horizontal" type="button" class="Arast-btn tooltip tooltip-top" data-title="Flip X"><span class="material-icons">flip</span></button>
                                            <button id="img-flip-vertical" type="button" class="Arast-btn tooltip tooltip-top" data-title="Flip Y"><span class="material-icons">flip</span></button>
                                            <button type="button" class="Arast-horizontal-center Arast-btn tooltip tooltip-top" data-title="H-Align Center"><span class="material-icons">align_horizontal_center</span></button>
                                            <button type="button" class="Arast-vertical-center Arast-btn tooltip tooltip-top" data-title="V-Align Center"><span class="material-icons">vertical_align_center</span></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="Arast-control-wrap label-block">
                                    <label class="Arast-control-label slider-label">Opacity<span>1</span></label>
                                    <div class="Arast-control">
                                        <input id="img-opacity" type="range" min="0" max="1" value="1" step="0.1" class="Arast-slider" autocomplete="off" />
                                    </div>
                                </div>
                                <div class="Arast-control-wrap label-block">
                                    <label class="Arast-control-label slider-label">Skew X<span>0</span></label>
                                    <div class="Arast-control">
                                        <input id="img-skew-x" type="range" min="0" max="180" value="0" step="1" class="Arast-slider" autocomplete="off" />
                                    </div>
                                </div>
                                <div class="Arast-control-wrap label-block">
                                    <label class="Arast-control-label slider-label">Skew Y<span>0</span></label>
                                    <div class="Arast-control">
                                        <input id="img-skew-y" type="range" min="0" max="180" value="0" step="1" class="Arast-slider" autocomplete="off" />
                                    </div>
                                </div>
                                <div class="Arast-control-wrap label-block">
                                    <label class="Arast-control-label slider-label">Rotate<span>0</span></label>
                                    <div class="Arast-control">
                                        <input id="img-rotate" type="range" min="0" max="360" value="0" step="1" class="Arast-slider" autocomplete="off" />
                                    </div>
                                </div>
                                <hr />
                                <button id="Arast-img-replace-media-library" type="button" class="Arast-btn Arast-lg-btn btn-full Arast-modal-open" data-target="#modal-media-library"><span class="material-icons">photo_library</span>Replace Image
                                </button>
                            </div>
                        </div>
                        <div id="Arast-overlay-image-mode" class="Arast-tab">
                            <div class="Arast-file-field">
                                <input type="file" name="Arast-file" id="Arast-overlay-img-upload" class="Arast-hidden-file" accept="image/png, image/jpeg" />
                                <label for="Arast-overlay-img-upload" class="Arast-btn primary Arast-lg-btn btn-full"><span class="material-icons">upload</span><span>Upload from computer</span></label>
                            </div>
                            <button id="Arast-overlay-img-media-library" type="button" class="Arast-btn primary Arast-lg-btn btn-full Arast-modal-open" data-target="#modal-media-library"><span class="material-icons">photo_library</span>Select From Media Library</button>
                            <button id="Arast-overlay-delete" type="button" class="Arast-btn Arast-lg-btn btn-full"><span class="material-icons">delete</span>Remove Overlay Image</button>
                            <div class="notice notice-warning">It is useful only if your PNG image has transparent parts and the size of the image (or the aspect ratio) is equal to the canvas. The overlay image will over all objects on the canvas and will be stretched to fit the canvas.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </>);
}

export default Image;