import { getCollections, getProducts } from '../src/lib/shopify.js';

async function test() {
  console.log('Testing Collections...');
  const collections = await getCollections(20);
  console.log('Collections:', collections.map(c => ({ title: c.title, handle: c.handle })));

  const products = await getProducts(10);
  console.log('Sample Product Images:', products.map(p => ({ title: p.title, img: p.featuredImageUrl })));
}

test();
