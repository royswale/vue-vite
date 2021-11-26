const fs = require("fs")
const path = require("path")

// Replaced in release.yml with GitHub Actions secrets
const DEPLOY_API = 'https://$DEPLOY_API'
const DEPLOY_CDN = 'https://$DEPLOY_CDN'

const DIST = '../api/MyApp/wwwroot'

// 404.html SPA fallback (supported by GitHub Pages, Cloudflare & Netlify CDNs)
fs.copyFileSync(
    path.resolve(`${DIST}/index.html`),
    path.resolve(`${DIST}/404.html`))

// define /api proxy routes (supported by Cloudflare or Netlify CDNs)  
fs.writeFileSync(`${DIST}/_redirects`,
    fs.readFileSync(`${DIST}/_redirects`, 'utf-8').replace(/\$DEPLOY_API/g,DEPLOY_API))

let redirects_contents = fs.readFileSync(`${DIST}/_redirects`, 'utf-8')
console.log('post.build.js', 'DEPLOY_API:', DEPLOY_API, 'DEPLOY_CDN:', DEPLOY_CDN
    , '_redirects:', redirects_contents
    , '_replace:', redirects_contents.replace(/\$DEPLOY_API/g,DEPLOY_API)
    , 'CNAME:', fs.readFileSync(`${DIST}/CNAME`, 'utf-8'))
