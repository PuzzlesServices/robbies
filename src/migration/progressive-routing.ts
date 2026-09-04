import { migrationConfig } from './config';
import fs from 'fs';
import path from 'path';

let ledgerCache: null | Set<string> = null;

function getLedgerSlugs() {
  if (ledgerCache) return ledgerCache;

  const set = new Set<string>();
  try {
    const filePath = path.join(process.cwd(), 'src', 'migration', 'migrations.json');
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      data.batches?.forEach((b: any) => {
        b.routes?.forEach((r: any) => set.add(r.slug));
      });
    }
  } catch (e) {
    console.error('Error reading migrations.json for progressive routing:', e);
  }
  ledgerCache = set;
  return set;
}

export function getProgressiveUrl(relativeUrl: string) {
  // If no URL or hash link, return as is
  if (!relativeUrl || relativeUrl.startsWith('#') || relativeUrl.startsWith('http')) {
    return relativeUrl;
  }

  const slugs = getLedgerSlugs();
  const base = relativeUrl.replace(migrationConfig.oldSiteDomain, '').split('#')[0].split('?')[0];
  
  let searchSlug = base.startsWith('/') ? base : '/' + base;
  if (!searchSlug.endsWith('/')) {
    searchSlug += '/';
  }
  
  // Normalize checking for both variants
  if (slugs.has(searchSlug) || slugs.has(searchSlug.slice(0, -1)) || (searchSlug === '/' && slugs.has('/'))) {
    return relativeUrl.replace(migrationConfig.oldSiteDomain, ''); // use local relative
  }
  
  // Otherwise point to old site
  if (relativeUrl.startsWith('/')) {
    return migrationConfig.oldSiteDomain + relativeUrl;
  }
  
  return migrationConfig.oldSiteDomain + '/' + relativeUrl;
}
