const fs = require("node:fs");
const path = require("node:path");
const dir = process.cwd();

let html = fs.readFileSync(path.join(dir, "index.html"), "utf8");

// Move demo creds hint to the bottom of the form
const demoCredsHtmlRegex = /<div class="demo-credentials-hint" id="demo-creds-hint">[\s\S]*?<\/div>\n\s*<\/div>/m;
const match = html.match(demoCredsHtmlRegex);

if (match) {
  const demoCredsBlock = match[0];
  html = html.replace(demoCredsBlock, ""); // Remove it from current position

  // Find the end of the form or near the footer prompt
  const footerPromptAnchor = `<div class="gateway-footer">`;
  if (html.includes(footerPromptAnchor)) {
    html = html.replace(footerPromptAnchor, demoCredsBlock + "\n\n          " + footerPromptAnchor);
    fs.writeFileSync(path.join(dir, "index.html"), html, "utf8");
    console.log("Moved demo creds hint to bottom.");
  } else {
    console.log("Could not find gateway-footer.");
  }
} else {
  console.log("Could not find demo-creds-hint block.");
}

// Ensure the demo-cred-btn handlers exist in scripts.js
let js = fs.readFileSync(path.join(dir, "scripts.js"), "utf8");
if (!js.includes("demoBtn.addEventListener")) {
  const jsHook = `  const gwSubmitBtn = document.querySelector('#gw-submit-btn');`;
  const injectJs = `
  document.querySelectorAll('.demo-cred-btn').forEach(demoBtn => {
    demoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = demoBtn.dataset.email;
      const pass = demoBtn.dataset.pass;
      const emailInput = document.querySelector('#gw-email-input');
      const passInput = document.querySelector('#gw-pass-input');
      if (emailInput && passInput) {
        emailInput.value = email;
        passInput.value = pass;
        // Optionally auto-submit
        const authForm = document.querySelector('#gateway-auth-form');
        if (authForm) authForm.dispatchEvent(new Event('submit'));
      }
    });
  });
  `;
  js = js.replace(jsHook, jsHook + injectJs);
  fs.writeFileSync(path.join(dir, "scripts.js"), js, "utf8");
  console.log("Added demo cred button handlers to JS.");
}

