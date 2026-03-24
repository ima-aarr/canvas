
import { State } from '../state.js';
import { Dragger } from './dragger.js';
import { Logger } from '../utils/logger.js';

export const ElementFactory = {

    createBaseElement() {
        const el = document.createElement('div');
        el.className = 'builder-element';
        
     
        const randomOffset = Math.floor(Math.random() * 40);
        el.style.left = `${100 + randomOffset}px`;
        el.style.top = `${100 + randomOffset}px`;
        
   
        el.addEventListener('mousedown', (e) => Dragger.onMouseDown(e, el));
        
        return el;
    },

    addText() {
        const el = this.createBaseElement();
        el.innerText = 'テキストを編集';
        el.contentEditable = true; 
        el.style.fontSize = '24px';
        el.style.color = '#000000';
        el.style.padding = '10px';
        el.style.minWidth = '150px';
        el.style.minHeight = '50px';
        
  
        el.addEventListener('mousedown', (e) => {
            if (document.activeElement === el) {
                e.stopPropagation();
            }
        });

        State.canvas.appendChild(el);
        State.select(el);
        Logger.info('Text element added to canvas.');
    },

    addBox() {
        const el = this.createBaseElement();
        el.style.width = '150px';
        el.style.height = '150px';
        el.style.backgroundColor = 'var(--accent-color)'; 
        
        State.canvas.appendChild(el);
        State.select(el);
        Logger.info('Box element added to canvas.');
    },


    addImage(file) {
        if (!file) {
            Logger.warn('No file selected for image insertion.');
            return;
        }

 
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const imgData = e.target.result; 
            const el = this.createBaseElement();
            
            const img = document.createElement('img');
            img.src = imgData;
            img.style.pointerEvents = 'none'; 

            el.style.width = '200px';
            el.style.height = '200px';
            el.appendChild(img);

            State.canvas.appendChild(el);
            State.select(el);
            Logger.info('Image element successfully parsed and added.');
        };
        
        reader.onerror = (e) => {
            Logger.error('Failed to read the image file.', e);
            alert('画像の読み込みにエラーが発生しました。');
        };
        

        reader.readAsDataURL(file);
    }
};
