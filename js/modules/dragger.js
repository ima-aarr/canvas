
import { State } from '../state.js';
import { Logger } from '../utils/logger.js';

export const Dragger = {
    isDragging: false,
    startX: 0,
    startY: 0,
    initialLeft: 0,
    initialTop: 0,

    init() {
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        document.addEventListener('mouseup', this.onMouseUp.bind(this));
        Logger.info('Dragger module initialized.');
    },

    onMouseDown(e, element) {

        if (State.isVertexEditing && State.selectedElement === element) {
            return;
        }

        State.select(element);
        
        this.isDragging = true;
        this.startX = e.clientX;
        this.startY = e.clientY;
        
        this.initialLeft = parseInt(element.style.left) || 0;
        this.initialTop = parseInt(element.style.top) || 0;
        
        e.stopPropagation(); 
    },

    onMouseMove(e) {
        if (!this.isDragging || !State.selectedElement) return;

        const dx = e.clientX - this.startX;
        const dy = e.clientY - this.startY;

        State.selectedElement.style.left = `${this.initialLeft + dx}px`;
        State.selectedElement.style.top = `${this.initialTop + dy}px`;
    },

    onMouseUp() {
        if (this.isDragging) {
            this.isDragging = false;
            Logger.debug('Drag ended.');
        }
    }
};
