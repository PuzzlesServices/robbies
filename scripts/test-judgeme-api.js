import https from 'https';

// Test Judge.me widget endpoints for shop.robbies.com
const shopDomain = 'shop.robbies.com';
const handle = 'dive-shaft-short-sleeve-tee';

const url = `https://judge.me/api/v1/widgets/product_review?shop_domain=${shopDomain}&platform=shopify&handle=${handle}`;

https.get(url, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status Code:', res.statusCode);
    try {
      console.log('Response:', JSON.parse(data));
    } catch(e) {
      console.log('Raw Data Snippet:', data.slice(0, 300));
    }
  });
}).on('error', err => console.error('Error:', err));
