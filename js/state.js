
import { Logger } from './utils/logger.js';

export const State = {
    canvas: null,
    selectedElement: null,
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
        this.select(null);
    }
};
