
import { State } from '../state.js';
import { Logger } from '../utils/logger.js';

export const Exporter = {
    exportHTML() {
        if (!State.canvas) return;


        State.clearSelection();
        const canvasClone = State.canvas.cloneNode(true);

        const elements = canvasClone.querySelectorAll('.builder-element');
        elements.forEach(el => {
            if (el.contentEditable === 'true') {
                el.removeAttribute('contenteditable');
            }
 
            el.classList.remove('selected', 'vertex-editing');
            
  
            const handles = el.querySelectorAll('.resize-handle, .vertex-handle');
            handles.forEach(handle => handle.remove());
        });

        const googleFonts = `
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;700&family=Noto+Sans+JP:wght@400;700&family=Noto+Serif+JP:wght@400;700&family=Sawarabi+Gothic&family=Sawarabi+Mincho&family=Yusei+Magic&display=swap" rel="stylesheet">`;

        const embeddedCSS = `
            body { margin: 0; background-color: #ffffff; overflow: hidden; font-family: 'Noto Sans JP', sans-serif; }
            #canvas-wrapper { perspective: 1200px; width: 100vw; height: 100vh; position: relative; }
            #canvas { width: 100%; height: 100%; position: relative; transform-style: preserve-3d; }
            .builder-element { position: absolute; box-sizing: border-box; transform-style: preserve-3d; transform-origin: center center; }
            .builder-element img, .builder-element svg { width: 100%; height: 100%; object-fit: fill; pointer-events: none; display: block; }
            
            .anim-bounce { animation: bounce 1.5s infinite ease-in-out alternate; }
            .anim-pulse { animation: pulse 2s infinite ease-in-out; }
            .anim-3d-spin { animation: spin3d 4s infinite linear; }
            .anim-3d-flip { animation: flip3d 3s infinite ease-in-out alternate; }
            
            @keyframes bounce { 0% { transform: translateY(0); } 100% { transform: translateY(-30px); } }
            @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
            @keyframes spin3d { from { transform: rotateY(0deg); } to { transform: rotateY(360deg); } }
            @keyframes flip3d { 0% { transform: perspective(400px) rotateX(0deg); } 100% { transform: perspective(400px) rotateX(180deg); } }
        `;

        const finalHTML = `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Generated Site</title>${googleFonts}
    <style>${embeddedCSS}</style>
</head>
<body>
    <div id="canvas-wrapper">
        <div id="canvas">
            ${canvasClone.innerHTML}
        </div>
    </div>
</body>
</html>`;

        try {
            const blob = new Blob([finalHTML], { type: 'text/html;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'my-amazing-site.html';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            Logger.info('HTML export completed.');
        } catch (error) {
            Logger.error('Failed to export HTML', error);
        }
    }
};
