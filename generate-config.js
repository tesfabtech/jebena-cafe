// generate-config.js
const fs = require('fs');

const config = {
  publicKey: process.env.EMAILJS_PUBLIC_KEY,
  serviceID: process.env.EMAILJS_SERVICE_ID,
  templateID: process.env.EMAILJS_TEMPLATE_ID,
};

const content = `const emailjsConfig = ${JSON.stringify(config, null, 2)};`;

fs.writeFileSync('./config.js', content);
console.log("✅ config.js created from Vercel environment variables.");
