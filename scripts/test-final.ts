import { getProducts } from '../src/lib/shopify';

async function testFinal() {
  const products = await getProducts(250);
  console.log(`Total in-stock products returned: ${products.length}`);
  console.log(`Products with real Shopify photos: ${products.filter(p => p.hasRealImage).length}`);
  console.log('Sample Top 5 Products:');
  products.slice(0, 5).forEach(p => {
    console.log(`- ${p.title} ($${p.priceRange?.minVariantPrice?.amount}) | Image: ${p.featuredImageUrl ? 'YES' : 'NO'} | Sizes: [${p.sizes.join(', ')}] | Colors: [${p.colors.map(c => c.name).join(', ')}]`);
  });
}

testFinal();
