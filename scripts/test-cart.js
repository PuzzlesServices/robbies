import https from 'https';

const domain = 'shop.robbies.com';
const token = '0d87a6f954a1e1d67f633ecce7ddfd2b';

// Test merchandise variant ID from previous product test: gid://shopify/ProductVariant/46513725669652 or similar
const testVariantId = 'gid://shopify/ProductVariant/46513725669652'; 

async function testCart() {
  // First fetch a valid variant ID from products
  const productsQuery = JSON.stringify({
    query: `{ products(first: 1) { edges { node { variants(first: 1) { edges { node { id title price { amount } } } } } } } }`
  });

  const productRes = await makeRequest(productsQuery);
  console.log('Product Variant:', JSON.stringify(productRes, null, 2));

  const variantId = productRes?.data?.products?.edges[0]?.node?.variants?.edges[0]?.node?.id;

  if (!variantId) {
    console.error('No variant ID found to test cart!');
    return;
  }

  console.log('Testing cartCreate with variantId:', variantId);

  const cartMutation = JSON.stringify({
    query: `
      mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            id
            checkoutUrl
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    variables: {
      input: {
        lines: [
          {
            merchandiseId: variantId,
            quantity: 1
          }
        ]
      }
    }
  });

  const cartRes = await makeRequest(cartMutation);
  console.log('Cart Result:', JSON.stringify(cartRes, null, 2));
}

function makeRequest(postData) {
  return new Promise((resolve, reject) => {
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
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch(e) {
          resolve(data);
        }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

testCart();
