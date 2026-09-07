import https from 'https';

const domain = 'shop.robbies.com';
const token = '0d87a6f954a1e1d67f633ecce7ddfd2b';

const query = `
query getProductsImages {
  products(first: 250, query: "available_for_sale:true") {
    edges {
      node {
        id
        title
        handle
        featuredImage { url }
        images(first: 5) { edges { node { url } } }
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
    const products = parsed.data?.products?.edges.map(e => e.node) || [];
    const withImg = products.filter(p => p.featuredImage?.url || p.images?.edges?.length > 0);
    const noImg = products.filter(p => !p.featuredImage?.url && (!p.images?.edges || p.images.edges.length === 0));

    console.log(`Total Products: ${products.length}`);
    console.log(`Products WITH image: ${withImg.length}`);
    console.log(`Products WITHOUT image in Shopify: ${noImg.length}`);
    console.log('\nSample Products WITHOUT Image in Shopify:');
    console.log(noImg.map(p => ({ title: p.title, handle: p.handle })));
  });
});

req.on('error', (e) => console.error('Error:', e));
req.write(postData);
req.end();
