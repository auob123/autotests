const fs = require('fs');
const path = require('path');

function createCodeSnippetFile(code, snippetFilename) {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Code Snippet</title>
    <style>
        body {
            font-family: 'Courier New', Courier, monospace;
            margin: 20px;
        }
        pre {
            white-space: pre-wrap;       
            white-space: -moz-pre-wrap;  
            white-space: -pre-wrap;      
            white-space: -o-pre-wrap;    
            word-wrap: break-word;       
        }
    </style>
</head>
<body>
    <pre><code>${escapeHtml(code)}</code></pre>
</body>
</html>`;

  fs.writeFileSync(snippetFilename, htmlContent, 'utf8');
}

function escapeHtml(code) {
  return code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}


// Asynchronous file read adapted to your existing code's structure
const testFilePath = '../playwright/tests/example.spec.js';  // adjust file path as needed
const snippetRelativePath = '../playwright/playwright-report/code-snippet.html'; 

fs.readFile(testFilePath, 'utf8', (err, testCode) => {
  if (err) {
    console.error('Error reading the test code file:', err);
    return;
  }
  
  // Now that you have the actual test code, create the snippet file
  createCodeSnippetFile(testCode, snippetRelativePath);
  
  // ... (The rest of your script, which should run after the snippet is created)
});



const { exec } = require('child_process');
// const fs = require('fs');

exec('', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error occurred: ${error.message}`);
    return;
  }
  
  console.log('Tests completed. Output:', stdout);
  
  const reportFilePath = 'playwright-report/index.html'; // Adjust if necessary
  const snippetFilename = '../playwright/playwright-report/code-snippet.html'; // Use the same name as the previous step
  
  fs.readFile(reportFilePath, 'utf8', (err, html) => {
    if (err) {
      console.error('Failed to read the HTML report:', err);
      return;
    }

    // Inject the hyperlink at the end of the body
    const link = `<a href="${snippetFilename}" target="_blank" style="display:block; margin-top:30px;">Your code is ready</a>`;
    const updatedHtml = html.replace('</body>', `${link}</body>`);

    fs.writeFile(reportFilePath, updatedHtml, 'utf8', (err) => {
      if (err) {
        console.error('Failed to update the HTML report with link:', err);
        return;
      }
      console.log('Successfully added code link to report.');
    });
  });
  
  import('open').then(open => {
    console.log('Opening the test report...');
    
    open.default('./playwright-report/index.html').catch((e) => {
      console.error('Failed to open the report:', e);
    });
  }).catch((e) => {
    console.error('Failed to import the open module:', e);
  });
});
