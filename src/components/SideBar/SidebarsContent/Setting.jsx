


const Setting = () => {
    return ( <>
    
    
    <div id="Arast-settings" class="Arast-icon-panel-content ">
                            <div class="Arast-control-wrap control-text-color">
                                <label class="Arast-control-label">Canvas Background</label>
                                <div class="Arast-control">
                                    <input id="custom-image-background" type="text" class="Arast-colorpicker allow-empty" autocomplete="off" value="" />
                                </div>
                            </div>
                            <hr />
                            <h5>Preferences</h5>
                            <div id="Arast-preferences">
                                <div class="Arast-control-wrap label-block">
                                    <label class="Arast-control-label slider-label">Font Size<span>14</span></label>
                                    <div class="Arast-control">
                                        <input id="custom-font-size" type="range" min="10" max="18" value="14" step="1" class="Arast-slider preference" autocomplete="off"/>
                                    </div>
                                </div>
                                <div class="Arast-control-wrap">
                                    <label class="Arast-control-label">Theme</label>
                                    <div class="Arast-control">
                                        <select id="custom-theme" class="Arast-select preference" autocomplete="off">
                                            <option value="dark" selected>Dark</option>
                                            <option value="light">Light</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="Arast-control-wrap control-text-color">
                                    <label class="Arast-control-label">Background</label>
                                    <div class="Arast-control">
                                        <input id="custom-background" type="text" class="Arast-colorpicker allow-empty preference" autocomplete="off" value="" />
                                    </div>
                                </div>
                                <div class="Arast-control-wrap control-text-color">
                                    <label class="Arast-control-label">Ruler Guide Color</label>
                                    <div class="Arast-control">
                                        <input id="ruler-guide-color" type="text" class="Arast-colorpicker allow-empty preference" autocomplete="off" value="#6658ea" />
                                    </div>
                                </div>
                                <div class="Arast-control-wrap label-block">
                                    <label class="Arast-control-label slider-label">Ruler Guide Size<span>1</span></label>
                                    <div class="Arast-control">
                                        <input id="ruler-guide-size" type="range" min="1" max="10" value="1" step="1" class="Arast-slider preference" autocomplete="off"/>
                                    </div>
                                </div>
                            </div>
                            <div class="Arast-control-wrap label-block">
                                <div class="Arast-control">
                                    <button id="Arast-preferences-save" type="button" class="Arast-btn Arast-lg-btn btn-full primary">Save Preferences</button>
                                </div>
                            </div>
                        </div>
    
    </> );
}
 
export default Setting;