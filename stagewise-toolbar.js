// stagewise-toolbar.js
// A lightweight development toolbar that shows useful information during development
// Works in conjunction with the window.IS_DEVELOPMENT flag in index.html

(function() {
    // Check if we're in development mode based on window flag
    // This flag should be set in index.html
    const isDevelopment = window.IS_DEVELOPMENT === true;
    
    if (!isDevelopment) {
        console.log('Stagewise Toolbar: Development mode is disabled. Toolbar will not be initialized.');
        return; // Exit early if not in development mode
    }
    
    console.log('Stagewise Toolbar: Initializing development tools...');
    
    // Create the toolbar element
    function createToolbar() {
        const toolbar = document.createElement('div');
        toolbar.id = 'stagewise-toolbar';
        toolbar.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.85);
            color: #00ff00;
            font-family: monospace;
            font-size: 12px;
            padding: 8px 16px;
            z-index: 9999;
            border-top: 1px solid #333;
            display: flex;
            justify-content: space-between;
            align-items: center;
        `;
        
        // Add toolbar content
        toolbar.innerHTML = `
            <div class="toolbar-section">
                <span>🔧 DEV MODE</span>
                <span id="stagewise-screen-size"></span>
            </div>
            <div class="toolbar-section">
                <button id="stagewise-toggle-grid" style="background: #333; color: white; border: none; padding: 4px 8px; margin-right: 8px; cursor: pointer;">Toggle Grid</button>
                <button id="stagewise-reload" style="background: #333; color: white; border: none; padding: 4px 8px; cursor: pointer;">Reload</button>
            </div>
        `;
        
        document.body.appendChild(toolbar);
        return toolbar;
    }
    
    // Initialize the toolbar functionality
    function initToolbar() {
        const toolbar = createToolbar();
        const screenSizeEl = document.getElementById('stagewise-screen-size');
        const toggleGridBtn = document.getElementById('stagewise-toggle-grid');
        const reloadBtn = document.getElementById('stagewise-reload');
        
        // Update screen size display
        function updateScreenSize() {
            screenSizeEl.textContent = `Screen: ${window.innerWidth}px × ${window.innerHeight}px`;
        }
        
        // Create grid overlay for layout debugging
        function createGridOverlay() {
            const gridOverlay = document.createElement('div');
            gridOverlay.id = 'stagewise-grid-overlay';
            gridOverlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 9998;
                pointer-events: none;
                opacity: 0.2;
                display: none;
                background-image: linear-gradient(to right, rgba(255,0,0,0.1) 1px, transparent 1px),
                                  linear-gradient(to bottom, rgba(255,0,0,0.1) 1px, transparent 1px);
                background-size: 100px 100px;
            `;
            document.body.appendChild(gridOverlay);
            return gridOverlay;
        }
        
        const gridOverlay = createGridOverlay();
        let gridVisible = false;
        
        // Toggle grid visibility
        toggleGridBtn.addEventListener('click', function() {
            gridVisible = !gridVisible;
            gridOverlay.style.display = gridVisible ? 'block' : 'none';
            toggleGridBtn.textContent = gridVisible ? 'Hide Grid' : 'Toggle Grid';
        });
        
        // Reload page
        reloadBtn.addEventListener('click', function() {
            window.location.reload();
        });
        
        // Listen for window resize
        window.addEventListener('resize', updateScreenSize);
        
        // Initial update
        updateScreenSize();
        
        // Add performance monitoring
        let lastFrameTime = performance.now();
        let frameCounter = 0;
        let fps = 0;
        
        function updateFPS() {
            const now = performance.now();
            frameCounter++;
            
            if (now - lastFrameTime >= 1000) {
                fps = Math.round(frameCounter * 1000 / (now - lastFrameTime));
                frameCounter = 0;
                lastFrameTime = now;
                
                // Add FPS counter if it doesn't exist
                if (!document.getElementById('stagewise-fps')) {
                    const fpsEl = document.createElement('span');
                    fpsEl.id = 'stagewise-fps';
                    fpsEl.style.marginLeft = '16px';
                    document.querySelector('.toolbar-section').appendChild(fpsEl);
                }
                
                const fpsEl = document.getElementById('stagewise-fps');
                fpsEl.textContent = `FPS: ${fps}`;
                fpsEl.style.color = fps < 30 ? '#ff0000' : '#00ff00';
            }
            
            requestAnimationFrame(updateFPS);
        }
        
        // Start FPS monitoring
        requestAnimationFrame(updateFPS);
    }
    
    // Initialize when DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initToolbar);
    } else {
        initToolbar();
    }
})();
