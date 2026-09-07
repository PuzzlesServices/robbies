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

export function getProgressiveUrl(url: string) {
  if (!url) return '/';
  if (url.startsWith('#')) return url;

  // Handle Shopify collection links
  if (url.includes('/collections/')) {
    const parts = url.split('/collections/');
    const collectionName = parts[1]?.split('?')[0]?.split('#')[0]?.replace(/\/$/, '');
    if (collectionName) {
      return `/shop?category=${encodeURIComponent(collectionName.toLowerCase())}`;
    }
    return '/shop';
  }

  // Handle shop.robbies.com
  if (url.includes('shop.robbies.com')) {
    return '/shop';
  }

  // Strip robbies.com domains
  let cleanUrl = url
    .replace(/^https?:\/\/(www\.)?robbies\.com/, '')
    .replace(/^https?:\/\/shop\.robbies\.com/, '');

  if (!cleanUrl || cleanUrl === '') {
    cleanUrl = '/';
  }

  // Ensure leading slash if not hash
  if (!cleanUrl.startsWith('/') && !cleanUrl.startsWith('#')) {
    cleanUrl = '/' + cleanUrl;
  }

  return cleanUrl;
}
