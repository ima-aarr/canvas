
import { State } from '../state.js';
import { Logger } from '../utils/logger.js';

export const StyleManager = {

    animationClasses: [
        'anim-bounce', 
        'anim-pulse', 
        'anim-3d-spin', 
        'anim-3d-flip'
    ],

  
    applyColor(hexColor) {
        const el = State.selectedElement;
        if (!el) {
            Logger.warn('No element selected to apply color.');
            return;
        }

   
        if (el.contentEditable === 'true') {
            el.style.color = hexColor;
        } else {
            el.style.backgroundColor = hexColor;
            el.style.backgroundImage = 'none'; 
        }
        Logger.info(`Applied color ${hexColor} to element.`);
    },


    applyGradient(color1, color2, angle) {
        const el = State.selectedElement;
        if (!el) {
            Logger.warn('No element selected to apply gradient.');
            alert('要素を選択してください');
            return;
        }

     
        if (el.contentEditable === 'true') {
            Logger.warn('Cannot apply background gradient to a text element directly.');
            alert('テキスト要素には背景グラデーションを適用できません（四角形をお使いください）。');
            return;
        }

        const gradientString = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
        el.style.backgroundImage = gradientString;
        Logger.info(`Applied gradient ${gradientString} to element.`);
    },


    applyAnimation(animClass) {
        const el = State.selectedElement;
        if (!el) {
            Logger.warn('No element selected to apply animation.');
            alert('要素を選択してください');
            return;
        }

        this.clearAnimations(); 

        requestAnimationFrame(() => {
            el.classList.add(animClass);
            Logger.info(`Applied animation ${animClass} to element.`);
        });
    },


    clearAnimations() {
        const el = State.selectedElement;
        if (!el) return;

        this.animationClasses.forEach(cls => {
            el.classList.remove(cls);
        });
        Logger.debug('Cleared all animations from element.');
    }
};
