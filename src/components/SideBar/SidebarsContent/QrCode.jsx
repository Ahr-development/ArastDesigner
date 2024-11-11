


const QrCode = () => {
    return (<>
        <div id="Arast-icon-panel">
            <div id="Arast-icon-panel-inner">
                <div id="Arast-qrcode" class="Arast-icon-panel-content ">
                    <div id="Arast-qrcode-settings">
                        <div class="Arast-control-wrap label-block">
                            <label class="Arast-control-label">Text</label>
                            <div class="Arast-control">
                                <input type="text" id="Arast-qrcode-text" class="Arast-form-field" autocomplete="off" value="https://mysite.com" />
                            </div>
                        </div>
                        <div class="Arast-control-wrap">
                            <label class="Arast-control-label">Size</label>
                            <div class="Arast-control">
                                <input id="Arast-qrcode-size" class="Arast-form-field" type="number" value="300" autocomplete="off" />
                            </div>
                        </div>
                        <div class="Arast-control-wrap control-text-color">
                            <label class="Arast-control-label">Fill Color</label>
                            <div class="Arast-control">
                                <input id="Arast-qrcode-fill" type="text" class="Arast-colorpicker disallow-empty" autocomplete="off" value="#333333" />
                            </div>
                        </div>
                        <div class="Arast-control-wrap control-text-color">
                            <label class="Arast-control-label">Background Color</label>
                            <div class="Arast-control">
                                <input id="Arast-qrcode-back" type="text" class="Arast-colorpicker disallow-empty" autocomplete="off" value="#FFFFFF" />
                            </div>
                        </div>
                        <div class="Arast-control-wrap label-block">
                            <label class="Arast-control-label slider-label">Rounded Corners<span>0</span></label>
                            <div class="Arast-control">
                                <input id="Arast-qrcode-rounded" type="range" min="0" max="100" value="0" step="1" class="Arast-slider" autocomplete="off" />
                            </div>
                        </div>
                        <hr />
                        <div class="Arast-control-wrap label-block">
                            <label class="Arast-control-label">Label</label>
                            <div class="Arast-control">
                                <input type="text" id="Arast-qrcode-label" class="Arast-form-field" autocomplete="off" value="" />
                            </div>
                        </div>
                        <div class="Arast-control-wrap control-text-color">
                            <label class="Arast-control-label">Label Color</label>
                            <div class="Arast-control">
                                <input id="Arast-qrcode-label-color" type="text" class="Arast-colorpicker disallow-empty" autocomplete="off" value="#333333" />
                            </div>
                        </div>
                        <div class="Arast-control-wrap label-block">
                            <label class="Arast-control-label slider-label">Label Size<span>30</span></label>
                            <div class="Arast-control">
                                <input id="Arast-qrcode-label-size" type="range" min="0" max="100" value="30" step="1" class="Arast-slider" autocomplete="off" />
                            </div>
                        </div>
                        <div class="Arast-control-wrap label-block">
                            <label class="Arast-control-label slider-label">Label Position X<span>50</span></label>
                            <div class="Arast-control">
                                <input id="Arast-qrcode-label-position-x" type="range" min="0" max="100" value="50" step="1" class="Arast-slider" autocomplete="off" />
                            </div>
                        </div>
                        <div class="Arast-control-wrap label-block">
                            <label class="Arast-control-label slider-label">Label Position Y<span>50</span></label>
                            <div class="Arast-control">
                                <input id="Arast-qrcode-label-position-y" type="range" min="0" max="100" value="50" step="1" class="Arast-slider" autocomplete="off" />
                            </div>
                        </div>
                    </div>
                    <hr />
                    <button id="Arast-generate-qr-code" type="button" class="Arast-btn primary Arast-lg-btn btn-full"><span class="material-icons">qr_code</span>Generate QR Code</button>
                </div>
            </div>
        </div>


    </>);
}

export default QrCode;