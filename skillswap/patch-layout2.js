const fs = require("node:fs");
const path = require("node:path");
const dir = process.cwd();

let html = fs.readFileSync(path.join(dir, "index.html"), "utf8");

const demoCredsHtmlRegex = /<div class="demo-credentials-hint" id="demo-creds-hint">[\s\S]*?<\/div>\n\s*<\/div>/m;
const match = html.match(demoCredsHtmlRegex);

if (match) {
  const demoCredsBlock = match[0];
  html = html.replace(demoCredsBlock, ""); // Remove it from current position

  const footerPromptAnchor = `<div class="gateway-card-footer">`;
  if (html.includes(footerPromptAnchor)) {
    html = html.replace(footerPromptAnchor, demoCredsBlock + "\n\n          " + footerPromptAnchor);
    fs.writeFileSync(path.join(dir, "index.html"), html, "utf8");
    console.log("Moved demo creds hint to bottom.");
  } else {
    console.log("Could not find gateway-card-footer.");
  }
} else {
  console.log("Could not find demo-creds-hint block.");
}
