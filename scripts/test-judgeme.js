import https from 'https';

const domain = 'shop.robbies.com';
const token = '0d87a6f954a1e1d67f633ecce7ddfd2b';

const query = `
query getProductJudgemeMetafields {
  products(first: 10, query: "available_for_sale:true") {
    edges {
      node {
        id
        title
        handle
        metafields(identifiers: [
          { namespace: "judgeme", key: "badge" },
          { namespace: "judgeme", key: "review_count" },
          { namespace: "judgeme", key: "rating" },
          { namespace: "judgeme", key: "widget" }
        ]) {
          key
          value
          namespace
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
    console.log(data);
  });
});

req.on('error', (e) => console.error('Error:', e));
req.write(postData);
req.end();
