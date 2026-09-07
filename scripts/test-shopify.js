import https from 'https';

const domain = 'shop.robbies.com';
const token = '0d87a6f954a1e1d67f633ecce7ddfd2b';

const query = `
query getProducts {
  products(first: 5) {
    edges {
      node {
        id
        title
        handle
        description
        featuredImage {
          url
          altText
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
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

console.log(`Testing Storefront API connection to ${domain}...`);

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('Status Code:', res.statusCode);
    try {
      const parsed = JSON.parse(data);
      console.log('Response:', JSON.stringify(parsed, null, 2));
    } catch (e) {
      console.log('Raw Data:', data);
    }
  });
});

req.on('error', (e) => {
  console.error('Request Error:', e);
});

req.write(postData);
req.end();
