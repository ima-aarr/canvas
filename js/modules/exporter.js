
import { State } from '../state.js';
import { Logger } from '../utils/logger.js';

export const Exporter = {
    exportHTML() {
        if (!State.canvas) {
            Logger.error('Canvas element not found for export.');
            return;
        }


        State.clearSelection();


        const canvasClone = State.canvas.cloneNode(true);


        const elements = canvasClone.querySelectorAll('.builder-element');
        elements.forEach(el => {
        
            if (el.contentEditable === 'true') {
                el.removeAttribute('contenteditable');
            }
    
            const handles = el.querySelectorAll('.resize-handle');
            handles.forEach(handle => handle.remove());
        });

   
        const embeddedCSS = `
            body { margin: 0; background-color: #ffffff; overflow: hidden; font-family: sans-serif; }
            #canvas-wrapper { perspective: 1200px; width: 100vw; height: 100vh; position: relative; }
            #canvas { width: 100%; height: 100%; position: relative; transform-style: preserve-3d; }
            .builder-element { position: absolute; box-sizing: border-box; transform-style: preserve-3d; transform-origin: center center; }
            .builder-element img { width: 100%; height: 100%; object-fit: fill; pointer-events: none; }
            
    
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
    <title>My Exported 3D Site</title>
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
            Logger.info('HTML export completed successfully.');
        } catch (error) {
            Logger.error('Failed to export HTML.', error);
            alert('エクスポートに失敗しました。');
        }
    }
};
