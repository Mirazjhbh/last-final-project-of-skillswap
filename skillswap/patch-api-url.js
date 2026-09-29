const fs = require("node:fs");
const path = require("node:path");
const dir = process.cwd();

let js = fs.readFileSync(path.join(dir, "scripts.js"), "utf8");

const oldApi = `  async function api(endpoint, options = {}) {
    try {
      const headers = { 'Content-Type': 'application/json', ...options.headers };
      const token = localStorage.getItem('skillswap_token');
      if (token) headers['Authorization'] = \`Bearer \${token}\`;

      const res = await fetch(endpoint, {
        ...options,
        headers
      });`;

const newApi = `  async function api(endpoint, options = {}) {
    try {
      const headers = { 'Content-Type': 'application/json', ...options.headers };
      const token = localStorage.getItem('skillswap_token');
      if (token) headers['Authorization'] = \`Bearer \${token}\`;

      // Auto-detect local file protocol and route to localhost
      let url = endpoint;
      if (window.location.protocol === 'file:') {
        url = 'http://localhost:3000' + endpoint;
      }

      const res = await fetch(url, {
        ...options,
        headers
      });`;

if (js.includes("const res = await fetch(endpoint, {")) {
  js = js.replace(oldApi, newApi);
  fs.writeFileSync(path.join(dir, "scripts.js"), js, "utf8");
  console.log("API wrapper patched for file:// protocol.");
} else {
  console.log("Could not find api wrapper.");
}
