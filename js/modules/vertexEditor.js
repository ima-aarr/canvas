
import { State } from '../state.js';
import { Logger } from '../utils/logger.js';

export const VertexEditor = {
    handles: [],
    isDraggingVertex: false,
    activeVertexIndex: -1,
    startX: 0,
    startY: 0,
    

    originalPoints: [], 

    init() {

        State.subscribe((selectedElement) => {
            if (!State.isVertexEditing || !selectedElement) {
                this.clearHandles();
            } else if (State.isVertexEditing && selectedElement) {
                this.renderHandles(selectedElement);
            }
        });

        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        document.addEventListener('mouseup', this.onMouseUp.bind(this));
        Logger.info('VertexEditor module initialized.');
    },

    renderHandles(element) {
        this.clearHandles();

        const polygon = element.querySelector('polygon');
        if (!polygon) return;

        
        const pointsString = polygon.getAttribute('points');
        this.originalPoints = pointsString.trim().split(/\s+/).map(pt => {
            const [x, y] = pt.split(',').map(Number);
            return { x, y };
        });

        const elWidth = element.offsetWidth;
        const elHeight = element.offsetHeight;

        this.originalPoints.forEach((point, index) => {
            const handle = document.createElement('div');
            handle.className = 'vertex-handle';
            
       
            const pxLeft = (point.x / 100) * elWidth;
            const pxTop = (point.y / 100) * elHeight;
            
            handle.style.left = `${pxLeft}px`;
            handle.style.top = `${pxTop}px`;


            handle.addEventListener('mousedown', (e) => this.onMouseDown(e, index, element));

            element.appendChild(handle);
            this.handles.push(handle);
        });
    },

    clearHandles() {
        this.handles.forEach(h => h.remove());
        this.handles = [];
        this.originalPoints = [];
    },

    onMouseDown(e, index, element) {
        this.isDraggingVertex = true;
        this.activeVertexIndex = index;
        this.startX = e.clientX;
        this.startY = e.clientY;

      
        e.stopPropagation();
    },

    onMouseMove(e) {
        if (!this.isDraggingVertex || this.activeVertexIndex === -1 || !State.selectedElement) return;

        const el = State.selectedElement;
        const polygon = el.querySelector('polygon');
        

        const dx = e.clientX - this.startX;
        const dy = e.clientY - this.startY;

        const elWidth = el.offsetWidth;
        const elHeight = el.offsetHeight;
        
        const svgDx = dx * (100 / elWidth);
        const svgDy = dy * (100 / elHeight);

        const originalPoint = this.originalPoints[this.activeVertexIndex];
  
        const newX = Math.max(0, Math.min(100, originalPoint.x + svgDx));
        const newY = Math.max(0, Math.min(100, originalPoint.y + svgDy));

        const newPointsArray = [...this.originalPoints];
        newPointsArray[this.activeVertexIndex] = { x: newX, y: newY };

        const newPointsString = newPointsArray.map(p => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
        polygon.setAttribute('points', newPointsString);

        const activeHandle = this.handles[this.activeVertexIndex];
        activeHandle.style.left = `${(newX / 100) * elWidth}px`;
        activeHandle.style.top = `${(newY / 100) * elHeight}px`;
    },

    onMouseUp() {
        if (this.isDraggingVertex) {
            this.isDraggingVertex = false;
            
  
            if (State.selectedElement) {
                const polygon = State.selectedElement.querySelector('polygon');
                const pointsString = polygon.getAttribute('points');
                this.originalPoints = pointsString.trim().split(/\s+/).map(pt => {
                    const [x, y] = pt.split(',').map(Number);
                    return { x, y };
                });
            }
            
            this.activeVertexIndex = -1;
            Logger.debug('Vertex drag ended.');
        }
    }
};
