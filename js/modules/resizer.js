
import { State } from '../state.js';
import { Logger } from '../utils/logger.js';

export const Resizer = {
    handles: [],
    isResizing: false,
    activeHandle: null,
    startX: 0,
    startY: 0,
    initialWidth: 0,
    initialHeight: 0,
    initialLeft: 0,
    initialTop: 0,

    init() {
     
        State.subscribe((selectedElement) => {
            if (State.isVertexEditing) {
                this.clearHandles();
            } else if (selectedElement) {
                this.renderHandles(selectedElement);
            } else {
                this.clearHandles();
            }
        });

        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        document.addEventListener('mouseup', this.onMouseUp.bind(this));
        Logger.info('Resizer module initialized.');
    },

    renderHandles(element) {
        this.clearHandles();

        const positions = ['tl', 'tr', 'bl', 'br'];
        positions.forEach(pos => {
            const handle = document.createElement('div');
            handle.className = `resize-handle ${pos}`;
            handle.addEventListener('mousedown', (e) => this.onMouseDown(e, pos, element));
            element.appendChild(handle);
            this.handles.push(handle);
        });
    },

    clearHandles() {
        this.handles.forEach(h => h.remove());
        this.handles = [];
    },

    onMouseDown(e, pos, element) {
        this.isResizing = true;
        this.activeHandle = pos;
        this.startX = e.clientX;
        this.startY = e.clientY;
        
        this.initialWidth = element.offsetWidth;
        this.initialHeight = element.offsetHeight;
        this.initialLeft = parseInt(element.style.left) || 0;
        this.initialTop = parseInt(element.style.top) || 0;

        e.stopPropagation();
    },

    onMouseMove(e) {
        if (!this.isResizing || !State.selectedElement) return;

        const dx = e.clientX - this.startX;
        const dy = e.clientY - this.startY;
        const el = State.selectedElement;

        let newWidth = this.initialWidth;
        let newHeight = this.initialHeight;
        let newLeft = this.initialLeft;
        let newTop = this.initialTop;

        if (this.activeHandle.includes('r')) newWidth = this.initialWidth + dx;
        if (this.activeHandle.includes('l')) {
            newWidth = this.initialWidth - dx;
            newLeft = this.initialLeft + dx;
        }
        if (this.activeHandle.includes('b')) newHeight = this.initialHeight + dy;
        if (this.activeHandle.includes('t')) {
            newHeight = this.initialHeight - dy;
            newTop = this.initialTop + dy;
        }

     
        if (newWidth > 20) {
            el.style.width = `${newWidth}px`;
            el.style.left = `${newLeft}px`;
        }
        if (newHeight > 20) {
            el.style.height = `${newHeight}px`;
            el.style.top = `${newTop}px`;
        }
    },

    onMouseUp() {
        if (this.isResizing) {
            this.isResizing = false;
            this.activeHandle = null;
            Logger.debug('Resize ended.');
        }
    }
};
