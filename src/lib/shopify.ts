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

// Helper to normalize product images, options (Sizes, Colors), and variants safely
export function formatProduct(node: any) {
  if (!node) return null;
  
  const images = node.images?.edges?.map((e: any) => e.node) || [];
  let featuredImageUrl = node.featuredImage?.url;
  
  // Fallback to first image in images list if featuredImage is null
  if (!featuredImageUrl && images.length > 0) {
    featuredImageUrl = images[0].url;
  }

  const variants = node.variants?.edges?.map((e: any) => e.node) || [];
  const inStockVariants = variants.filter((v: any) => v.availableForSale !== false);
  const activeVariants = inStockVariants.length > 0 ? inStockVariants : variants;

  // Extract Sizes and Colors options
  const sizesSet = new Set<string>();
  const colorsSet = new Set<string>();

  node.options?.forEach((opt: any) => {
    const nameUpper = opt.name?.toUpperCase() || '';
    if (nameUpper.includes('SIZE') || nameUpper.includes('TALLA')) {
      opt.values?.forEach((val: string) => sizesSet.add(val));
    }
    if (nameUpper.includes('COLOR') || nameUpper.includes('COLOUR')) {
      opt.values?.forEach((val: string) => colorsSet.add(val));
    }
  });

  // Color mapping helper
  const colorMap: Record<string, string> = {
    'black': '#18181b',
    'white': '#ffffff',
    'navy': '#1e3a8a',
    'blue': '#2563eb',
    'sky': '#38bdf8',
    'cyan': '#06b6d4',
    'green': '#15803d',
    'camo': '#4d5d36',
    'grey': '#6b7280',
    'gray': '#6b7280',
    'red': '#dc2626',
    'pink': '#ec4899',
    'purple': '#7e22ce',
    'yellow': '#eab308',
    'orange': '#ea580c'
  };

  const colors = Array.from(colorsSet).map(c => {
    const lower = c.toLowerCase();
    let hex = '#2B447A';
    for (const [key, colorHex] of Object.entries(colorMap)) {
      if (lower.includes(key)) {
        hex = colorHex;
        break;
      }
    }
    return { name: c, hex };
  });

  return {
    ...node,
    featuredImageUrl: featuredImageUrl || '',
    hasRealImage: !!featuredImageUrl,
    imagesList: images.length > 0 ? images : (featuredImageUrl ? [{ url: featuredImageUrl, altText: node.title }] : []),
    variantsList: activeVariants,
    sizes: Array.from(sizesSet),
    colors,
    inStock: node.availableForSale !== false && activeVariants.length > 0
  };
}

// 1. Fetch Products List (Only In-Stock Products)
export async function getProducts(first = 250) {
  const query = `
    query getProducts($first: Int!) {
      products(first: $first, query: "available_for_sale:true") {
        edges {
          node {
            id
            title
            handle
            availableForSale
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
              name
              values
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
            variants(first: 25) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
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

  const data = await shopifyFetch({ query, variables: { first } });
  const rawProducts = data?.products?.edges.map((edge: any) => edge.node) || [];
  const formatted = rawProducts.map(formatProduct).filter((p: any) => p && p.inStock);

  // Sort so products with real images appear first
  return formatted.sort((a: any, b: any) => (b.hasRealImage ? 1 : 0) - (a.hasRealImage ? 1 : 0));
}

// 2. Fetch Collections / Categories
export async function getCollections(first = 50) {
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

// 3. Fetch Products By Collection Handle (In-Stock Only)
export async function getProductsByCollection(collectionHandle: string, first = 250) {
  const query = `
    query getProductsByCollection($handle: String!, $first: Int!) {
      collection(handle: $handle) {
        id
        title
        handle
        description
        products(first: $first, filters: [{ available: true }]) {
          edges {
            node {
              id
              title
              handle
              availableForSale
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
                name
                values
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
              variants(first: 25) {
                edges {
                  node {
                    id
                    title
                    availableForSale
                    price {
                      amount
                      currencyCode
                    }
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
    }
  `;

  const data = await shopifyFetch({ query, variables: { handle: collectionHandle, first } });
  const rawProducts = data?.collection?.products?.edges.map((edge: any) => edge.node) || [];
  const formatted = rawProducts.map(formatProduct).filter((p: any) => p && p.inStock);

  return formatted.sort((a: any, b: any) => (b.hasRealImage ? 1 : 0) - (a.hasRealImage ? 1 : 0));
}

// 4. Fetch Single Product By Handle
export async function getProductByHandle(handle: string) {
  const query = `
    query getProductByHandle($handle: String!) {
      product(handle: $handle) {
        id
        title
        handle
        availableForSale
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
        variants(first: 25) {
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
