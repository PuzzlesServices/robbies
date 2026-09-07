import { getCollections } from '../src/lib/shopify';

async function checkCategories() {
  const collections = await getCollections(50);
  console.log('All Collections in Store:');
  collections.forEach(c => console.log(`- ${c.title} (handle: ${c.handle})`));
}

checkCategories();
