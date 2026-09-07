import { getProducts } from '../src/lib/shopify';

async function testImages() {
  const products = await getProducts(100);
  const withImages = products.filter(p => p.featuredImageUrl !== '/assets/home/imgi_19_shop.webp');
  console.log(`Total products: ${products.length}, Products with real Shopify images: ${withImages.length}`);
  if (withImages.length > 0) {
    console.log('Sample Products with images:', withImages.slice(0, 5).map(p => ({ title: p.title, img: p.featuredImageUrl })));
  }
}

testImages();
