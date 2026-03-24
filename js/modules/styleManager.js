
import { State } from '../state.js';
import { Logger } from '../utils/logger.js';

export const StyleManager = {
    animationClasses: [
        'anim-bounce', 'anim-pulse', 'anim-3d-spin', 'anim-3d-flip'
    ],

    applyColor(hexColor) {
        const el = State.selectedElement;
        if (!el) return;

   
        if (el.contentEditable === 'true') {
            el.style.color = hexColor;
        } 
 
        else if (el.querySelector('svg')) {
            const svg = el.querySelector('svg');
            svg.style.fill = hexColor;
            svg.style.opacity = '1'; 
            el.style.backgroundImage = 'none'; 
        } 

        else {
            el.style.backgroundColor = hexColor;
            el.style.backgroundImage = 'none';
        }
        Logger.info(`Applied color ${hexColor}`);
    },

    changeFontFamily(fontFamily) {
        const el = State.selectedElement;
        if (!el || el.contentEditable !== 'true') {
            alert('テキスト要素を選択してください。');
            return;
        }
        el.style.fontFamily = fontFamily;
        Logger.info(`Changed font to ${fontFamily}`);
    },

    changeFontSize(sizePx) {
        const el = State.selectedElement;
        if (!el || el.contentEditable !== 'true') return;
        
        el.style.fontSize = `${sizePx}px`;

        el.style.lineHeight = '1.2';
        Logger.info(`Changed font size to ${sizePx}px`);
    },

    applyGradient(color1, color2, angle) {
        const el = State.selectedElement;
        if (!el) return;

        if (el.contentEditable === 'true') {
            alert('テキスト要素には背景グラデーションを適用できません。');
            return;
        }

        const svg = el.querySelector('svg');

        if (svg) {
            if (svg.innerHTML.includes('<rect')) {
                svg.style.opacity = '0';
            } else {
                alert('グラデーションは四角形専用です（円や星型には適用できません）。');
                return;
            }
        }

        const gradientString = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
        el.style.backgroundImage = gradientString;
        Logger.info(`Applied gradient ${gradientString}`);
    },

    layerUp() {
        const el = State.selectedElement;
        if (!el) return;
        const currentZ = parseInt(window.getComputedStyle(el).zIndex) || 10;
        el.style.zIndex = currentZ + 1;
        Logger.info(`Layer moved up (z-index: ${el.style.zIndex})`);
    },

    layerDown() {
        const el = State.selectedElement;
        if (!el) return;
        const currentZ = parseInt(window.getComputedStyle(el).zIndex) || 10;

        el.style.zIndex = Math.max(1, currentZ - 1);
        Logger.info(`Layer moved down (z-index: ${el.style.zIndex})`);
    },

    applyAnimation(animClass) {
        const el = State.selectedElement;
        if (!el) {
            alert('要素を選択してください');
            return;
        }
        this.clearAnimations();
        requestAnimationFrame(() => {
            el.classList.add(animClass);
            Logger.info(`Applied animation ${animClass}`);
        });
    },

    clearAnimations() {
        const el = State.selectedElement;
        if (!el) return;
        this.animationClasses.forEach(cls => el.classList.remove(cls));
    }
};
