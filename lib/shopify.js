const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN;

async function ShopifyData(query) {
  const URL = `https://${domain}/api/2022-10/graphql.json`;

  const options = {
    endpoint: URL,
    method: 'POST',
    headers: {
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  };

  try {
    const data = await fetch(URL, options).then((response) => {
      return response.json();
    });

    return data;
  } catch (error) {
    console.log(error);
    throw new Error('Products not fetched');
  }
}
export async function getProductsInCollection(handle) {
  console.log('what is handle', handle);
  const query = `
  {
    collection(handle: "${handle}") {
      title
      products(first: 25) {
        edges {
          node {
            id
            title
            handle
            availableForSale
            totalInventory
            priceRange {
              minVariantPrice {
                amount
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            previousCustomOrder: metafield(namespace: "custom", key: "custom_order") {
              value
              type
            }
          }
        }
      }
    }
  }`;

  const response = await ShopifyData(query);
  const allProducts = response.data.collection.products.edges
    ? response.data.collection.products.edges
    : [];

  return allProducts;
}

export async function getProductsHomePage() {
  const query = `
  {
    collection(handle: "frontPage") {
      title
      products(first: 25) {
        edges {
          node {
            id
            title
            handle
            availableForSale
            priceRange {
              minVariantPrice {
                amount
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }`;

  const response = await ShopifyData(query);

  const allProducts = response.data.collection.products.edges
    ? response.data.collection.products.edges
    : [];

  return allProducts;
}

export async function getAllProducts() {
  const query = `{
    products(first: 250) {
      edges {
        node {
          handle
          id
        }
      }
    }
  }`;

  const response = await ShopifyData(query);

  const slugs = response.data.products.edges
    ? response.data.products.edges
    : [];

  return slugs;
}

export async function getProduct(handle) {
  const query = `
  {
    product(handle: "${handle}") {
    	collections(first: 1) {
      	edges {
          node {
            products(first: 5) {
              edges {
                node {
                  priceRange {
                    minVariantPrice {
                      amount
                    }
                  }
                  handle
                  title
                  id
                  availableForSale
                  images(first: 5) {
                    edges {
                      node {
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        }
    	}
      id
      title
      handle
      description
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      options {
        name
        values
        id
      }
      variants(first: 25) {
        edges {
          node {
            selectedOptions {
              name
              value
            }
            image {
              url
              altText
            }
            title
            id
            availableForSale
            priceV2 {
              amount
            }
          }
        }
      }
      availableForSale
      returnsRefunds: metafield(namespace: "custom", key: "returns_refunds") {
        value
        type
      }
      materials: metafield(namespace: "custom", key: "materials") {
        value
        type
      }
      careInstructions: metafield(namespace: "descriptors", key: "care_guide") {
        value
        type
      }
      personalize: metafield(namespace: "custom", key: "personalizable") {
        value
        type
      }
      madeToOrder: metafield(namespace: "custom", key: "made_to_order") {
        value
        type
      }
      previousCustomOrder: metafield(namespace: "custom", key: "custom_order") {
        value
        type
      }
      productType,
      vendor,
      tags
    }
  }`;

  const response = await ShopifyData(query);

  const product = response.data.product ? response.data.product : [];

  return product;
}

export async function createCheckout(id, quantity) {
  const query = `
    mutation {
      checkoutCreate(input: {
        lineItems: [{ variantId: "${id}", quantity: ${quantity}}]
      }) {
        checkout {
          id
          webUrl
        }
      }
    }`;

  const response = await ShopifyData(query);

  const checkout = response.data.checkoutCreate.checkout
    ? response.data.checkoutCreate.checkout
    : [];

  return checkout;
}

export async function updateCheckout(id, lineItems = []) {
  const lineItemsObject = lineItems.map((item) => {
    return `{
      variantId: "${item.id}",
      quantity:  ${item.variantQuantity}
    }`;
  });

  const query = `
  mutation {
    checkoutLineItemsReplace(lineItems: [${lineItemsObject}], checkoutId: "${id}") {
      checkout {
        id
        webUrl
        lineItems(first: 25) {
          edges {
            node {
              id
              title
              quantity
            }
          }
        }
      }
    }
  }`;

  const response = await ShopifyData(query);

  const checkout = response.data.checkoutLineItemsReplace.checkout
    ? response.data.checkoutLineItemsReplace.checkout
    : [];

  return checkout;
}

export async function checkoutCustomerAssociateV2(
  checkoutId,
  customerAccessToken
) {
  const query = `
    mutation {
      checkoutCustomerAssociateV2(checkoutId: "${checkoutId}", customerAccessToken: "${customerAccessToken}") {
        checkout {
          id
          webUrl
        }
      }
    }`;

  const response = await ShopifyData(query);

  const checkout = response.data.checkoutCustomerAssociateV2.checkout
    ? response.data.checkoutCustomerAssociateV2.checkout
    : [];

  return checkout;
}

export async function recursiveCatalog(cursor = '', initialRequest = true) {
  let data;

  if (cursor !== '') {
    const query = `{
      products(after: "${cursor}", first: 250) {
        edges {
          cursor
          node {
            id
            handle
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }`;

    const response = await ShopifyData(query);
    data = response.data.products.edges ? response.data.products.edges : [];

    if (response.data.products.pageInfo.hasNextPage) {
      const num = response.data.products.edges.length;
      const cursor = response.data.products.edges[num - 1].cursor;
      console.log('Cursor: ', cursor);

      return data.concat(await recursiveCatalog(cursor));
    } else {
      return data;
    }
  } else {
    const query = `{
      products(first: 250) {
        edges {
          cursor
          node {
            id
            handle
          }
        }
        pageInfo {
          hasNextPage
        }
      }
    }
    `;

    const response = await ShopifyData(query);
    data = response.data.products.edges ? response.data.products.edges : [];

    if (response.data.products.pageInfo.hasNextPage) {
      const num = response.data.products.edges.length;
      const cursor = response.data.products.edges[num - 1].cursor;

      return data.concat(await recursiveCatalog(cursor));
    } else {
      return data;
    }
  }
}

export async function createCustomer(email, password, firstName, lastName) {
  const query = `
    mutation {
      customerCreate(input: {
        email: "${email}",
        password: "${password}",
        firstName: "${firstName}",
        lastName: "${lastName}"
      }) {
        customerUserErrors {
          code
          field
          message
        }
        customer {
          id
        }
      }
    }`;

  const response = await ShopifyData(query);

  const customerCreate = response.data.customerCreate
    ? response.data.customerCreate
    : {};

  return customerCreate;
}

export async function customerActivateByUrl(activationUrl, password) {
  const query = `
    mutation {
      customerActivateByUrl(activationUrl: ${activationUrl},
      password: "${password})" {
        customerUserErrors {
          code
          field
          message
        }
        customer {
          id
        }
      }
    }`;

  const response = await ShopifyData(query);

  const customer = response.data.customerActivateByUrl.customer
    ? response.data.customerActivateByUrl.customer
    : [];

  return customer;
}

export async function customerAccessTokenCreate(email, password) {
  const query = `
    mutation {
      customerAccessTokenCreate(input: {
        email: "${email}",
        password: "${password}",
      }) {
        customerUserErrors {
          code
          field
          message
        }
        customerAccessToken {
          accessToken
          expiresAt
        }
      }
    }`;

  const response = await ShopifyData(query);

  const customerAccessToken = response.data.customerAccessTokenCreate
    .customerAccessToken
    ? response.data.customerAccessTokenCreate.customerAccessToken
    : {};

  return customerAccessToken;
}

export async function customerAccessTokenDelete(customerAccessToken) {
  const query = `
    mutation {
      customerAccessTokenDelete(customerAccessToken: "${customerAccessToken}") {
        userErrors {
          field
          message
        }
        deletedAccessToken
        deletedCustomerAccessTokenId
      }
    }`;

  const response = await ShopifyData(query);

  const customerAccessTokenDelete = response.data.customerAccessTokenDelete
    .deletedCustomerAccessTokenId
    ? response.data.customerAccessTokenDelete.deletedCustomerAccessTokenId
    : {};

  return customerAccessTokenDelete;
}
const CUSTOMER_ADDRESS_QUERY = `
  firstName
  lastName
  address1
  address2
  company
  phone
  city
  country
  province
  zip
`;

export async function customerQuery(customerAccessToken) {
  const query = `{
  customer(customerAccessToken: "${customerAccessToken}") {
    id
    firstName
    lastName
    acceptsMarketing
    email
    phone
    defaultAddress {
      ${CUSTOMER_ADDRESS_QUERY}
    }
    orders(first:100){
      edges{
        node{
          orderNumber
          totalPriceV2 {
            amount
          }
          processedAt
          statusUrl
          successfulFulfillments(first: 100){
            trackingInfo(first: 100){
              number
              url
            }
          }
          lineItems(first:100){
            edges{
              node{
                quantity
                title
                variant{
                  title
                  priceV2 {
                    amount
                  }
                  image{
                    originalSrc
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`;
  const response = await ShopifyData(query);

  const customerAccessTokenDelete = response.data.customer
    ? response.data.customer
    : {};

  return customerAccessTokenDelete;
}
