const fs = require("node:fs");
const path = require("node:path");
const dir = process.cwd();

let html = fs.readFileSync(path.join(dir, "index.html"), "utf8");

const oldGoogleBtnRegex = /<button class="gateway-google-btn" id="gw-google-btn"[^>]*>[\s\S]*?<\/button>/m;

const newSocialBtns = `
          <div class="global-sso-buttons">
            <button class="sso-btn sso-google" id="gw-google-btn" type="button" aria-label="Continue with Google">
              <svg class="sso-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z" />
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.92 0 12s.45 3.85 1.24 5.42l4.04-3.15z" />
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
              </svg>
              <span class="sso-label" id="gw-google-label">Continue with Google</span>
            </button>
            <button class="sso-btn sso-apple" id="gw-apple-btn" type="button" aria-label="Continue with Apple">
              <svg class="sso-icon" viewBox="0 0 384 512" width="18" height="18" aria-hidden="true" fill="currentColor">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
              </svg>
            </button>
            <button class="sso-btn sso-github" id="gw-github-btn" type="button" aria-label="Continue with GitHub">
              <svg class="sso-icon" viewBox="0 0 496 512" width="18" height="18" aria-hidden="true" fill="currentColor">
                <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
              </svg>
            </button>
          </div>
`;

if (oldGoogleBtnRegex.test(html)) {
  html = html.replace(oldGoogleBtnRegex, newSocialBtns);
  fs.writeFileSync(path.join(dir, "index.html"), html, "utf8");
  console.log("Global SSO Buttons injected!");
} else {
  console.log("Regex failed to find google button.");
}

// Add CSS
let css = fs.readFileSync(path.join(dir, "styles.css"), "utf8");
if (!css.includes("global-sso-buttons")) {
  const cssBlock = `
.global-sso-buttons {
  display: flex;
  gap: 10px;
  width: 100%;
}
.sso-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 12px;
  height: 48px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--ink);
  font-weight: 600;
  font-size: 15px;
}
.sso-btn:hover {
  background: var(--paper-2);
}
.sso-google {
  flex: 1;
  gap: 10px;
}
.sso-apple, .sso-github {
  width: 48px;
  padding: 0;
}
[data-theme="dark"] .sso-apple, [data-theme="dark"] .sso-github {
  color: #fff;
}
`;
  fs.appendFileSync(path.join(dir, "styles.css"), cssBlock, "utf8");
  console.log("SSO CSS injected!");
}

// Add JS
let js = fs.readFileSync(path.join(dir, "scripts.js"), "utf8");
if (!js.includes("gw-github-btn")) {
  const jsHook = `  if (gwGoogleBtn) gwGoogleBtn.addEventListener('click', openGoogleModal);`;
  const injectJs = `
  const gwAppleBtn = document.querySelector('#gw-apple-btn');
  const gwGithubBtn = document.querySelector('#gw-github-btn');
  if (gwAppleBtn) gwAppleBtn.addEventListener('click', () => showToast('Apple Sign In connecting...', '??'));
  if (gwGithubBtn) gwGithubBtn.addEventListener('click', () => showToast('GitHub Sign In connecting...', '??'));
  `;
  js = js.replace(jsHook, jsHook + injectJs);
  fs.writeFileSync(path.join(dir, "scripts.js"), js, "utf8");
  console.log("SSO JS handlers injected!");
}

