
import { State } from '../state.js';
import { Logger } from '../utils/logger.js';

export const Resizer = {
    handles: [],
    isResizing: false,
    currentHandle: null,
    startX: 0,
    startY: 0,
    initialWidth: 0,
    initialHeight: 0,
    initialLeft: 0,
    initialTop: 0,

    init() {
 
        State.subscribe(this.updateHandles.bind(this));
        
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        document.addEventListener('mouseup', this.onMouseUp.bind(this));
        Logger.info('Resizer module initialized.');
    },


    updateHandles(selectedElement) {
 
        this.handles.forEach(handle => handle.remove());
        this.handles = [];


        if (!selectedElement) return;

  
        const positions = ['tl', 'tr', 'bl', 'br'];
        positions.forEach(pos => {
            const handle = document.createElement('div');
            handle.className = `resize-handle ${pos}`;
            

            handle.addEventListener('mousedown', (e) => this.onMouseDown(e, pos, selectedElement));
            

            selectedElement.appendChild(handle);
            this.handles.push(handle);
        });
    },

    onMouseDown(e, pos, element) {
        this.isResizing = true;
        this.currentHandle = pos;
        this.startX = e.clientX;
        this.startY = e.clientY;

        const style = window.getComputedStyle(element);
        this.initialWidth = parseFloat(style.width) || element.offsetWidth;
        this.initialHeight = parseFloat(style.height) || element.offsetHeight;
        this.initialLeft = parseFloat(style.left) || 0;
        this.initialTop = parseFloat(style.top) || 0;

        e.stopPropagation();
    },

    onMouseMove(e) {
        if (!this.isResizing || !State.selectedElement) return;

        const dx = e.clientX - this.startX;
        const dy = e.clientY - this.startY;
        const el = State.selectedElement;

 
        const MIN_SIZE = 20;

  
        if (this.currentHandle.includes('r')) { 
            el.style.width = `${Math.max(MIN_SIZE, this.initialWidth + dx)}px`;
        }
        if (this.currentHandle.includes('b')) { 
            el.style.height = `${Math.max(MIN_SIZE, this.initialHeight + dy)}px`;
        }
        if (this.currentHandle.includes('l')) { 
            const newWidth = Math.max(MIN_SIZE, this.initialWidth - dx);
            if (newWidth > MIN_SIZE) {
                el.style.width = `${newWidth}px`;
                el.style.left = `${this.initialLeft + dx}px`;
            }
        }
        if (this.currentHandle.includes('t')) { 
            const Math_max = Math.max; 
            const newHeight = Math_max(MIN_SIZE, this.initialHeight - dy);
            if (newHeight > MIN_SIZE) {
                el.style.height = `${newHeight}px`;
                el.style.top = `${this.initialTop + dy}px`;
            }
        }
    },

    onMouseUp() {
        if (this.isResizing) {
            this.isResizing = false;
            this.currentHandle = null;
            Logger.debug('Resize interaction ended.');
        }
    }
};
