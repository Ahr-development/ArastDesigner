


const Draw = () => {
    return (<>

        <div id="Arast-icon-panel">
            <div id="Arast-icon-panel-inner">
                <div id="Arast-draw" class="Arast-icon-panel-content ">
                    <div class="Arast-btn-set">
                        <button id="Arast-draw-btn" type="button" class="Arast-btn primary Arast-lg-btn"><span class="material-icons">edit</span>Start Drawing</button>
                        <button id="Arast-draw-undo" type="button" class="Arast-btn Arast-lg-btn" autocomplete="off" title="Undo" disabled><span class="material-icons">undo</span></button>
                    </div>
                    <div id="Arast-draw-settings" class="Arast-sub-settings">
                        <div class="notice notice-info">You can draw a straight line by pressing the shift key.</div>
                        <div class="Arast-control-wrap">
                            <label class="Arast-control-label">Brush Type</label>
                            <div class="Arast-control">
                                <select id="Arast-brush-select" class="Arast-select" autocomplete="off">
                                    <option value="pencil" selected>Pencil</option>
                                    <option value="circle">Circle</option>
                                    <option value="spray">Spray</option>
                                    <option value="hline">H-line Pattern</option>
                                    <option value="vline">V-line Pattern</option>
                                    <option value="square">Square Pattern</option>
                                    <option value="erase">Erase BG Image</option>
                                </select>
                            </div>
                        </div>
                        <div class="Arast-control-wrap">
                            <label class="Arast-control-label">Brush Width</label>
                            <div class="Arast-control">
                                <input id="brush-width" class="Arast-form-field numeric-field" type="number" value="50" autocomplete="off" data-min="1" data-max="1000" data-step="1" />
                            </div>
                        </div>
                        <div id="Arast-brush-pattern-width" class="Arast-control-wrap">
                            <label class="Arast-control-label">Pattern Width</label>
                            <div class="Arast-control">
                                <input id="brush-pattern-width" class="Arast-form-field numeric-field" type="number" value="10" autocomplete="off" data-min="1" data-max="1000" data-step="1" />
                            </div>
                        </div>
                        <div id="Arast-brush-pattern-distance" class="Arast-control-wrap">
                            <label class="Arast-control-label">Pattern Distance</label>
                            <div class="Arast-control">
                                <input id="brush-pattern-distance" class="Arast-form-field numeric-field" type="number" value="5" autocomplete="off" data-min="1" data-max="1000" data-step="1" />
                            </div>
                        </div>
                        <div id="not-erase-brush">
                            <div class="Arast-control-wrap control-text-color">
                                <label class="Arast-control-label">Brush Color</label>
                                <div class="Arast-control">
                                    <input id="brush-color" type="text" class="Arast-colorpicker allow-empty" autocomplete="off" value="#ffffff" />
                                </div>
                            </div>
                            <div class="Arast-control-wrap conditional">
                                <label class="Arast-control-label">Brush Shadow</label>
                                <div class="Arast-control Arast-toggle-control">
                                    <label class="Arast-toggle">
                                        <input id="Arast-brush-shadow" class="Arast-toggle-checkbox" data-conditional="#line-shadow-settings" type="checkbox" autocomplete="off" />
                                        <div class="Arast-toggle-switch"></div>
                                    </label>
                                </div>
                            </div>
                            <div id="line-shadow-settings" class="d-none conditional-settings">
                                <div class="Arast-control-wrap">
                                    <label class="Arast-control-label">Blur</label>
                                    <div class="Arast-control">
                                        <input id="brush-shadow-width" class="Arast-form-field" type="number" value="5" data-min="0" data-max="1000" step="1" autocomplete="off" />
                                    </div>
                                </div>
                                <div class="Arast-control-wrap">
                                    <label class="Arast-control-label">Offset X</label>
                                    <div class="Arast-control">
                                        <input id="brush-shadow-shadow-offset-x" class="Arast-form-field" type="number" value="5" data-min="0" data-max="100" step="1" autocomplete="off" />
                                    </div>
                                </div>
                                <div class="Arast-control-wrap">
                                    <label class="Arast-control-label">Offset Y</label>
                                    <div class="Arast-control">
                                        <input id="brush-shadow-shadow-offset-y" class="Arast-form-field" type="number" value="5" data-min="0" data-max="100" step="1" autocomplete="off" />
                                    </div>
                                </div>
                                <div class="Arast-control-wrap control-text-color">
                                    <label class="Arast-control-label">Color</label>
                                    <div class="Arast-control">
                                        <input id="brush-shadow-color" type="text" class="Arast-colorpicker allow-empty" autocomplete="off" value="#000000" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            </div>
    </>);
}

export default Draw;