/**
 * Toggle Development Mode Script
 * 
 * This script helps toggle between development and production modes
 * for the stagewise toolbar integration.
 * 
 * Usage:
 * - Run with Node.js: node toggle-dev-mode.js
 * - It will modify the IS_DEVELOPMENT flag in index.html
 */

const fs = require('fs');
const path = require('path');

// Path to the index.html file
const indexPath = path.join(__dirname, 'index.html');

// Read the current content of index.html
fs.readFile(indexPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading index.html:', err);
    return;
  }

  // Check the current mode
  const isDev = data.includes('window.IS_DEVELOPMENT = true');
  const newMode = isDev ? false : true;
  
  // Replace the development flag
  const updatedContent = data.replace(
    /window\.IS_DEVELOPMENT = (true|false)/,
    `window.IS_DEVELOPMENT = ${newMode}`
  );
  
  // Write the updated content back to index.html
  fs.writeFile(indexPath, updatedContent, 'utf8', (err) => {
    if (err) {
      console.error('Error writing to index.html:', err);
      return;
    }
    
    console.log(`✅ Development mode ${newMode ? 'ENABLED' : 'DISABLED'}`);
    console.log(`Stagewise toolbar is now ${newMode ? 'ACTIVE' : 'INACTIVE'}`);
  });
});
