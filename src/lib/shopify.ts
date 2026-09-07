const domain = (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_SHOPIFY_STORE_DOMAIN) || 'shop.robbies.com';
const storefrontToken = (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN) || '0d87a6f954a1e1d67f633ecce7ddfd2b';

export async function shopifyFetch<T = any>({
  query,
  variables = {}
}: {
  query: string;
  variables?: Record<string, any>;
}): Promise<T> {
  const url = `https://${domain}/api/2024-07/graphql.json`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontToken,
      },
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      console.error('Shopify GraphQL Errors:', json.errors);
      throw new Error(json.errors[0]?.message || 'Shopify API Error');
    }

    return json.data;
  } catch (error) {
    console.error('Shopify Fetch Exception:', error);
    throw error;
  }
}

// Helper to normalize product images safely
export function formatProduct(node: any) {
  if (!node) return null;
  
  const images = node.images?.edges?.map((e: any) => e.node) || [];
  let featuredImageUrl = node.featuredImage?.url;
  
  // Fallback to first image in images list if featuredImage is null
  if (!featuredImageUrl && images.length > 0) {
    featuredImageUrl = images[0].url;
  }

  return {
    ...node,
    featuredImageUrl: featuredImageUrl || '/assets/home/imgi_19_shop.webp',
    imagesList: images.length > 0 ? images : [{ url: featuredImageUrl || '/assets/home/imgi_19_shop.webp', altText: node.title }]
  };
}

// 1. Fetch Products List
export async function getProducts(first = 100, queryStr = '') {
  const query = `
    query getProducts($first: Int!, $queryStr: String) {
      products(first: $first, query: $queryStr) {
        edges {
          node {
            id
            title
            handle
            description
            descriptionHtml
            vendor
            productType
            featuredImage {
              url
              altText
              width
              height
            }
            images(first: 10) {
              edges {
                node {
                  url
                  altText
                  width
                  height
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch({ query, variables: { first, queryStr } });
  const rawProducts = data?.products?.edges.map((edge: any) => edge.node) || [];
  return rawProducts.map(formatProduct);
}

// 2. Fetch Collections / Categories
export async function getCollections(first = 20) {
  const query = `
    query getCollections($first: Int!) {
      collections(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            image {
              url
              altText
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch({ query, variables: { first } });
  return data?.collections?.edges.map((edge: any) => edge.node) || [];
}

// 3. Fetch Products By Collection Handle
export async function getProductsByCollection(collectionHandle: string, first = 100) {
  const query = `
    query getProductsByCollection($handle: String!, $first: Int!) {
      collection(handle: $handle) {
        id
        title
        handle
        description
        products(first: $first) {
          edges {
            node {
              id
              title
              handle
              description
              descriptionHtml
              vendor
              productType
              featuredImage {
                url
                altText
                width
                height
              }
              images(first: 10) {
                edges {
                  node {
                    url
                    altText
                    width
                    height
                  }
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
                maxVariantPrice {
                  amount
                  currencyCode
                }
              }
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                    availableForSale
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch({ query, variables: { handle: collectionHandle, first } });
  const rawProducts = data?.collection?.products?.edges.map((edge: any) => edge.node) || [];
  return rawProducts.map(formatProduct);
}

// 4. Fetch Single Product By Handle
export async function getProductByHandle(handle: string) {
  const query = `
    query getProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        description
        descriptionHtml
        vendor
        productType
        featuredImage {
          url
          altText
          width
          height
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
              width
              height
            }
          }
        }
        options {
          id
          name
          values
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 20) {
          edges {
            node {
              id
              title
              availableForSale
              sku
              price {
                amount
                currencyCode
              }
              selectedOptions {
                name
                value
              }
              image {
                url
                altText
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch({ query, variables: { handle } });
  return data?.product ? formatProduct(data.product) : null;
}
