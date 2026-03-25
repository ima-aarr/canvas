
import { Logger } from './utils/logger.js';
import { State } from './state.js';
import { Dragger } from './modules/dragger.js';
import { Resizer } from './modules/resizer.js';
import { ElementFactory } from './modules/elementFactory.js';
import { StyleManager } from './modules/styleManager.js';
import { VertexEditor } from './modules/vertexEditor.js'; 
import { Exporter } from './modules/exporter.js';

document.addEventListener('DOMContentLoaded', () => {
    Logger.info('Pro Builder starting...');

    const canvas = document.getElementById('canvas');
    if (!canvas) {
        Logger.error('Critical: Canvas element not found!');
        return;
    }


    State.init(canvas);
    Dragger.init();
    Resizer.init();
    VertexEditor.init(); 


    canvas.addEventListener('mousedown', (e) => {
        if (e.target === canvas) {
            State.clearSelection();
        }
    });


    canvas.addEventListener('dblclick', (e) => {
        const el = e.target.closest('.builder-element');
        if (el && el.classList.contains('builder-polygon')) {
            State.enterVertexEditMode();
        }
    });


    
    
    document.getElementById('btn-add-text').addEventListener('click', () => ElementFactory.addText());
    document.getElementById('btn-add-shape').addEventListener('click', () => {
        ElementFactory.addShape(document.getElementById('select-shape').value);
    });

    document.getElementById('btn-add-polygon').addEventListener('click', () => {
        ElementFactory.addPolygon();
    });

    const imageInput = document.getElementById('input-add-image');
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) ElementFactory.addImage(file);
        e.target.value = '';
    });


    document.getElementById('select-font-family').addEventListener('change', (e) => StyleManager.changeFontFamily(e.target.value));
    document.getElementById('input-font-size').addEventListener('input', (e) => StyleManager.changeFontSize(e.target.value));


    document.getElementById('input-color').addEventListener('input', (e) => StyleManager.applyColor(e.target.value));
    document.getElementById('btn-apply-gradient').addEventListener('click', () => {
        StyleManager.applyGradient(
            document.getElementById('input-grad-color1').value,
            document.getElementById('input-grad-color2').value,
            document.getElementById('input-grad-angle').value
        );
    });


    document.getElementById('btn-layer-up').addEventListener('click', () => StyleManager.layerUp());
    document.getElementById('btn-layer-down').addEventListener('click', () => StyleManager.layerDown());


    document.getElementById('btn-anim-bounce').addEventListener('click', () => StyleManager.applyAnimation('anim-bounce'));
    document.getElementById('btn-anim-pulse').addEventListener('click', () => StyleManager.applyAnimation('anim-pulse'));
    document.getElementById('btn-anim-3d-spin').addEventListener('click', () => StyleManager.applyAnimation('anim-3d-spin'));
    document.getElementById('btn-anim-3d-flip').addEventListener('click', () => StyleManager.applyAnimation('anim-3d-flip'));
    document.getElementById('btn-anim-clear').addEventListener('click', () => StyleManager.clearAnimations());


    document.getElementById('btn-export').addEventListener('click', () => Exporter.exportHTML());

    Logger.info('Pro Builder successfully initialized.');
});
