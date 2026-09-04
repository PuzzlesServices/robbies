import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sitemaps = [
  'https://www.robbies.com/page-sitemap.xml',
  'https://www.robbies.com/post-sitemap.xml',
  'https://www.robbies.com/local-sitemap.xml'
];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', err => reject(err));
  });
}

function generateTitleFromUrl(url) {
  try {
    const parsed = new URL(url);
    let pathname = parsed.pathname;
    if (pathname === '/') return 'Home';
    
    // Remove trailing slash or .htm/.html extension
    pathname = pathname.replace(/\/$/, '').replace(/\.html?$/, '');
    
    // Get the last segment
    const parts = pathname.split('/');
    let slug = parts[parts.length - 1];
    
    // Convert to Title Case
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  } catch(e) {
    return url;
  }
}

async function run() {
  console.log('Fetching sitemaps...');
  let allUrls = new Set();
  
  for (const url of sitemaps) {
    try {
      const xml = await fetchUrl(url);
      const locRegex = /<loc>(.*?)<\/loc>/g;
      let match;
      while ((match = locRegex.exec(xml)) !== null) {
        allUrls.add(match[1]);
      }
      console.log(`Fetched ${url} - Found urls. Current total unique: ${allUrls.size}`);
    } catch (err) {
      console.error(`Failed to fetch ${url}`, err);
    }
  }

  // Load migrations.json
  const migrationsFile = path.join(__dirname, '../src/migration/migrations.json');
  const ledger = JSON.parse(fs.readFileSync(migrationsFile, 'utf-8'));
  
  // Find already migrated
  const migratedSlugs = new Set();
  ledger.batches.forEach(b => b.routes.forEach(r => migratedSlugs.add(r.slug)));

  const upcomingRoutes = [];
  
  allUrls.forEach(url => {
    let urlSlug = new URL(url).pathname.replace(/\.html?$/, '');
    if (!urlSlug.endsWith('/')) urlSlug += '/';
    
    // Check variants for migrated
    const isMigrated = migratedSlugs.has(urlSlug) || 
                       migratedSlugs.has(urlSlug.slice(0, -1)) || 
                       (urlSlug === '/' && migratedSlugs.has('/'));
                       
    if (!isMigrated) {
      upcomingRoutes.push({
        title: generateTitleFromUrl(url),
        url: url
      });
    }
  });

  ledger.upcomingRoutes = upcomingRoutes;
  fs.writeFileSync(migrationsFile, JSON.stringify(ledger, null, 2));
  
  const totalPages = migratedSlugs.size + upcomingRoutes.length;
  console.log(`Total Pages calculation: ${migratedSlugs.size} migrated + ${upcomingRoutes.length} upcoming = ${totalPages}`);

  // Update config.ts
  const configPath = path.join(__dirname, '../src/migration/config.ts');
  let configContent = fs.readFileSync(configPath, 'utf-8');
  configContent = configContent.replace(/totalPages:\s*\d+,/, `totalPages: ${totalPages},`);
  fs.writeFileSync(configPath, configContent);
  
  console.log('Done mapping sitemaps!');
}

run();
