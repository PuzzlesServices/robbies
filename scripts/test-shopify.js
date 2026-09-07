import https from 'https';

const domain = 'shop.robbies.com';
const token = '0d87a6f954a1e1d67f633ecce7ddfd2b';

const query = `
query getCollectionsAndTags {
  collections(first: 100) {
    edges {
      node {
        id
        title
        handle
      }
    }
  }
  products(first: 250, query: "available_for_sale:true") {
    edges {
      node {
        id
        title
        handle
        productType
        tags
        collections(first: 10) {
          edges {
            node {
              handle
              title
            }
          }
        }
      }
    }
  }
}
`;

const postData = JSON.stringify({ query });

const options = {
  hostname: domain,
  path: '/api/2024-07/graphql.json',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Shopify-Storefront-Access-Token': token,
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const parsed = JSON.parse(data);
    const collections = parsed.data?.collections?.edges.map(e => e.node) || [];
    console.log('--- COLLECTIONS FOUND IN SHOPIFY ---');
    console.log(JSON.stringify(collections, null, 2));

    const products = parsed.data?.products?.edges.map(e => e.node) || [];
    console.log(`\nTotal In-Stock Products Fetched: ${products.length}`);
    
    // Group product types and tags
    const types = new Set();
    const tags = new Set();
    products.forEach(p => {
      if (p.productType) types.add(p.productType);
      p.tags?.forEach((t) => tags.add(t));
    });
    console.log('\nProduct Types:', Array.from(types));
    console.log('Product Tags:', Array.from(tags));
  });
});

req.on('error', (e) => console.error('Error:', e));
req.write(postData);
req.end();
