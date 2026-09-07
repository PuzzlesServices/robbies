import { shopifyFetch } from '../src/lib/shopify';

async function testInStock() {
  const query = `
    query getInStockProducts {
      products(first: 50, query: "available_for_sale:true") {
        edges {
          node {
            id
            title
            handle
            availableForSale
            featuredImage {
              url
            }
            images(first: 5) {
              edges {
                node {
                  url
                }
              }
            }
            options {
              name
              values
            }
            variants(first: 20) {
              edges {
                node {
                  id
                  title
                  price { amount }
                  availableForSale
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch({ query });
  const products = data?.products?.edges?.map((e: any) => e.node) || [];
  
  console.log(`Found ${products.length} in-stock products!`);
  products.slice(0, 5).forEach(p => {
    console.log('---');
    console.log('Title:', p.title);
    console.log('Image:', p.featuredImage?.url || p.images?.edges[0]?.node?.url);
    console.log('Options:', p.options);
    console.log('Variants count:', p.variants?.edges?.length);
  });
}

testInStock();
