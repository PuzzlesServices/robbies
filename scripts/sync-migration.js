import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.join(__dirname, '../src/pages');
const migrationsFile = path.join(__dirname, '../src/migration/migrations.json');

// Helper to get local date in YYYY-MM-DD
function getLocalDate() {
  const date = new Date();
  return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
}

// Convert path to slug and title
function pathToRouteInfo(relPath) {
  let slug = '/' + relPath.replace(/\\/g, '/').replace(/\.astro$/, '');
  if (slug.endsWith('/index')) {
    slug = slug.replace('/index', '/');
  }
  
  const title = slug === '/' 
    ? 'Home' 
    : slug.split('/').filter(Boolean).map(s => s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, ' ')).join(' - ');

  return { 
    slug, 
    title,
    seo: {
      score: 100,
      metaTitle: true,
      metaDescription: true,
      openGraph: true,
      schemaOrg: true,
      canonical: true
    }
  };
}

// Read all astro files recursively
function getAstroPages(dir, baseDir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAstroPages(filePath, baseDir));
    } else {
      if (file.endsWith('.astro') && !file.startsWith('_') && file !== '404.astro' && file !== 'migration-progress.astro' && !filePath.includes('[') && !filePath.includes(']')) {
        results.push(pathToRouteInfo(path.relative(baseDir, filePath)));
      }
    }
  });
  return results;
}

function runSync() {
  console.log('Starting migration sync...');
  const currentPages = getAstroPages(pagesDir, pagesDir);
  
  if (!fs.existsSync(migrationsFile)) {
    console.error('migrations.json not found!');
    process.exit(1);
  }

  const ledger = JSON.parse(fs.readFileSync(migrationsFile, 'utf-8'));
  
  // Flatten all existing recorded routes
  const recordedSlugs = new Set();
  ledger.batches.forEach(b => b.routes.forEach(r => recordedSlugs.add(r.slug)));

  // Identify new routes
  const newRoutes = currentPages.filter(p => !recordedSlugs.has(p.slug));

  if (newRoutes.length > 0) {
    const today = getLocalDate();
    let todayBatch = ledger.batches.find(b => b.date === today);
    
    if (!todayBatch) {
      todayBatch = { date: today, routes: [] };
      ledger.batches.unshift(todayBatch); // Add to the top
    }
    
    todayBatch.routes.push(...newRoutes);
    
    console.log(`Added ${newRoutes.length} new route(s) to batch ${today}.`);
  } else {
    console.log('No new routes found.');
  }

  // Check for missing physical routes
  const physicalSlugs = new Set(currentPages.map(p => p.slug));
  ledger.batches.forEach(b => {
    b.routes.forEach(r => {
      if (!physicalSlugs.has(r.slug)) {
        console.warn(`WARN: Route ${r.slug} is in the ledger but not found physically in src/pages/`);
      }
    });
  });

  fs.writeFileSync(migrationsFile, JSON.stringify(ledger, null, 2), 'utf-8');
  console.log('Sync complete.');
}

runSync();
