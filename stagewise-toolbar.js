// stagewise-toolbar.js

/**
 * Stagewise Toolbar Integration
 * This script initializes the stagewise toolbar for AI-powered editing capabilities
 * It only runs in development mode and provides a visual indicator when active
 */

(function() {
  // Check if we're in development mode
  const isDevelopment = window.IS_DEVELOPMENT === true || 
                       (window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1');
  
  // Only initialize the toolbar in development mode
  if (!isDevelopment) {
    console.log('Stagewise toolbar disabled in production mode');
    return;
  }
  
  // Basic configuration for the toolbar
  const stagewiseConfig = {
    plugins: [],
    // Add any additional configuration options here
    debug: true,
    // You can customize the toolbar appearance if needed
    appearance: {
      position: 'bottom-right'
    }
  };
  
  // Function to initialize the toolbar
  function initStagewiseToolbar() {
    // Check if stagewise is loaded
    if (typeof window.stagewise !== 'undefined' && window.stagewise.initToolbar) {
      try {
        window.stagewise.initToolbar(stagewiseConfig);
        console.log('✅ Stagewise toolbar initialized in development mode');
        
        // Add a small indicator that stagewise is active
        addStagewiseIndicator();
      } catch (error) {
        console.error('Failed to initialize Stagewise toolbar:', error);
      }
    } else {
      console.error('Stagewise toolbar not loaded. Make sure to include the stagewise script.');
    }
  }
  
  // Add a small visual indicator that stagewise is active
  function addStagewiseIndicator() {
    const indicator = document.createElement('div');
    indicator.id = 'stagewise-indicator';
    indicator.style.cssText = `
      position: fixed;
      bottom: 10px;
      left: 10px;
      background: rgba(0, 0, 0, 0.7);
      color: #00ff00;
      font-size: 12px;
      padding: 5px 8px;
      border-radius: 4px;
      z-index: 9999;
      font-family: monospace;
      pointer-events: none;
      opacity: 0.7;
    `;
    indicator.textContent = '🔧 Stagewise Dev Mode';
    document.body.appendChild(indicator);
    
    // Make it fade out after 5 seconds
    setTimeout(() => {
      indicator.style.opacity = '0.3';
    }, 5000);
  }
  
  // Initialize when the DOM is fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initStagewiseToolbar);
  } else {
    // DOM already loaded, initialize immediately
    initStagewiseToolbar();
  }
})();
