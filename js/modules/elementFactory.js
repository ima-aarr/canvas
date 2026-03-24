
import { State } from '../state.js';
import { Dragger } from './dragger.js';
import { Logger } from '../utils/logger.js';

export const ElementFactory = {

    zIndexCounter: 10,

    createBaseElement() {
        const el = document.createElement('div');
        el.className = 'builder-element';
        
        const randomOffset = Math.floor(Math.random() * 40);
        el.style.left = `${100 + randomOffset}px`;
        el.style.top = `${100 + randomOffset}px`;
        

        el.style.zIndex = this.zIndexCounter++;
        
        el.addEventListener('mousedown', (e) => Dragger.onMouseDown(e, el));
        return el;
    },

    addText() {
        const el = this.createBaseElement();
        el.innerText = 'テキストを編集';
        el.contentEditable = true;
        
  
        el.style.fontFamily = "'Noto Sans JP', sans-serif";
        el.style.fontSize = '24px';
        el.style.color = '#000000';
        el.style.lineHeight = '1.5';
        el.style.padding = '10px';
        el.style.minWidth = '150px';
        el.style.minHeight = '50px';
        
        el.addEventListener('mousedown', (e) => {
            if (document.activeElement === el) e.stopPropagation();
        });

        State.canvas.appendChild(el);
        State.select(el);
        Logger.info('Text element added.');
    },


    addShape(type) {
        const el = this.createBaseElement();
        const defaultColor = '#ff4081'; 
  
        let svgContent = '';
        const svgBase = `<svg viewBox="0 0 100 100" preserveAspectRatio="none" style="fill: ${defaultColor};">`;
        
        switch (type) {
            case 'rect':
           
                svgContent = `${svgBase}<rect width="100" height="100" /></svg>`;
                el.style.width = '150px';
                el.style.height = '150px';
                break;
            case 'circle':
                
                svgContent = `${svgBase}<circle cx="50" cy="50" r="50" /></svg>`;
                el.style.width = '150px';
                el.style.height = '150px';
                break;
            case 'triangle':
              
                svgContent = `${svgBase}<polygon points="50,0 100,100 0,100" /></svg>`;
                el.style.width = '150px';
                el.style.height = '130px';
                break;
            case 'star':
        
                svgContent = `${svgBase}<polygon points="50,5 61,40 98,40 68,62 79,96 50,75 21,96 32,62 2,40 39,40" /></svg>`;
                el.style.width = '150px';
                el.style.height = '150px';
                break;
        }

        el.innerHTML = svgContent;
        State.canvas.appendChild(el);
        State.select(el);
        Logger.info(`Shape (${type}) added.`);
    },

    addImage(file) {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            const el = this.createBaseElement();
            const img = document.createElement('img');
            img.src = e.target.result;
            
            el.style.width = '200px';
            el.style.height = '200px';
            el.appendChild(img);

            State.canvas.appendChild(el);
            State.select(el);
            Logger.info('Image added.');
        };
        reader.onerror = (e) => { alert('画像の読み込みエラー'); };
        reader.readAsDataURL(file);
    }
};
