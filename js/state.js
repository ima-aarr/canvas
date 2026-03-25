
import { Logger } from './utils/logger.js';

export const State = {
    canvas: null,
    selectedElement: null,
    isVertexEditing: false, 
    observers: [],

    init(canvasElement) {
        this.canvas = canvasElement;
        Logger.info('State initialized with canvas.', canvasElement);
    },

    subscribe(callback) {
        this.observers.push(callback);
    },

    notify() {
        this.observers.forEach(callback => callback(this.selectedElement));
    },

    select(element) {
        if (this.selectedElement === element) return;
        
 
        if (this.isVertexEditing) {
            this.exitVertexEditMode();
        }
        
        if (this.selectedElement) {
            this.selectedElement.classList.remove('selected');
        }
        
        this.selectedElement = element;
        
        if (this.selectedElement) {
            this.selectedElement.classList.add('selected');
        }
        
        Logger.debug('Element selection changed:', element);
        this.notify();
    },

    clearSelection() {
        if (this.isVertexEditing) {
            this.exitVertexEditMode();
        }
        this.select(null);
    },


    enterVertexEditMode() {
        if (!this.selectedElement || !this.selectedElement.classList.contains('builder-polygon')) {
            return false;
        }
        this.isVertexEditing = true;
        this.selectedElement.classList.add('vertex-editing');
        Logger.info('Entered vertex editing mode.');
        this.notify(); 
        return true;
    },


    exitVertexEditMode() {
        if (this.selectedElement) {
            this.selectedElement.classList.remove('vertex-editing');
        }
        this.isVertexEditing = false;
        Logger.info('Exited vertex editing mode.');
        this.notify(); 
    }
};
