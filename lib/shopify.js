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
// CHECKOUT storefront API this is rate limited
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

  const checkout = response.data.checkoutLineItemsReplace
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
// CART storefront API
export async function fetchCart(id) {
  const query = `
     {
      cart( id: "${id}") {
             id
             lines(first: 10) {
               edges {
                 node {
                   id
                   quantity
                   merchandise {
                     ... on ProductVariant {
                       id
                       title
                       priceV2 {
                         amount
                         currencyCode
                       }
                       product {
                         title
                         handle
                         images(first: 1) {
                           edges {
                             node {
                               src
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
             estimatedCost {
               totalAmount {
                 amount
                 currencyCode
               }
               subtotalAmount {
                 amount
                 currencyCode
               }
               totalTaxAmount {
                 amount
                 currencyCode
               }
               totalDutyAmount {
                 amount
                 currencyCode
               }
             }
           }
    }`;

  const response = await ShopifyData(query);

  if (!response.data.cart) {
    return {};
  }

  // clean up some GraphQL noise to make the cart easier to use
  const cart = {
    ...response.data.cart,
    lines: response.data.cart.lines.edges.map(({ node }) => node),
  };

  return cart;
}
export async function createCartWithItem({ itemId, quantity }) {
  const query = `
    mutation {
      cartCreate(input: { lines: [ { quantity: ${quantity},  merchandiseId: "${itemId}" }]}) {
            cart {
              id
              createdAt
              updatedAt
              lines(first:10) {
                edges {
                  node {
                    id
                    quantity
                    merchandise {
                      ... on ProductVariant {
                        id
                        title
                        priceV2 {
                          amount
                          currencyCode
                        }
                        product {
                          id
                          title
                          handle
                          images(first: 1) {
                            edges {
                              node {
                                src
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
              estimatedCost {
                totalAmount {
                  amount
                  currencyCode
                }
                subtotalAmount {
                  amount
                  currencyCode
                }
                totalTaxAmount {
                  amount
                  currencyCode
                }
                totalDutyAmount {
                  amount
                  currencyCode
                }
              }
            }
          }
    }
  `;
  const response = await ShopifyData(query);
  if (!response.data.cartCreate) {
    return {};
  }
  const cart = {
    ...response.data.cartCreate.cart,
    lines: response.data.cartCreate.cart.lines.edges.map(({ node }) => node),
  };

  return cart;
}

export async function addItemsToCart({ cartId, itemId, quantity }) {
  const query = `
        mutation {
          cartLinesAdd(cartId: "${cartId}", lines: [ { quantity: ${quantity},  merchandiseId: "${itemId}" }]) {
            cart {
              id
              lines(first: 10) {
                edges {
                  node {
                    id
                    quantity
                    merchandise {
                      ... on ProductVariant {
                        id
                        priceV2 {
                          amount
                          currencyCode
                        }
                        title
                        product {
                          title
                          handle
                          images(first: 1) {
                            edges {
                              node {
                                src
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
              estimatedCost {
                totalAmount {
                  amount
                  currencyCode
                }
                subtotalAmount {
                  amount
                  currencyCode
                }
                totalTaxAmount {
                  amount
                  currencyCode
                }
                totalDutyAmount {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      `;
  const response = await ShopifyData(query);
  if (!response.data.cartLinesAdd) {
    return {};
  }
  const cart = {
    ...response.data.cartLinesAdd.cart,
    lines: response.data.cartLinesAdd.cart.lines.edges.map(({ node }) => node),
  };

  return cart;
}
export async function updateItemsInCart({ cartId, itemId, quantity }) {
  const query = `
        mutation {
          cartLinesUpdate(cartId: "${cartId}", lines: [{ id: "${itemId}", quantity: ${quantity}}]) {
            cart {
              id
              lines(first: 10) {
                edges {
                  node {
                    id
                    quantity
                    merchandise {
                      ... on ProductVariant {
                        id
                        priceV2 {
                          amount
                          currencyCode
                        }
                        title
                        product {
                          title
                          handle
                          images(first: 1) {
                            edges {
                              node {
                                src
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
              estimatedCost {
                totalAmount {
                  amount
                  currencyCode
                }
                subtotalAmount {
                  amount
                  currencyCode
                }
                totalTaxAmount {
                  amount
                  currencyCode
                }
                totalDutyAmount {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      `;
  const response = await ShopifyData(query);
  if (!response.data.cartLinesUpdate) {
    return {};
  }
  const cart = {
    ...response.data.cartLinesUpdate.cart,
    lines: response.data.cartLinesUpdate.cart.lines.edges.map(
      ({ node }) => node
    ),
  };
  return cart;
}

export async function deleteItemsFromCart({ cartId, lineIds }) {
  const query = `
        mutation {
          cartLinesRemove(cartId: "${cartId}", lineIds: [ "${lineIds}"]) {
            cart {
              id
              lines(first: 10) {
                edges {
                  node {
                    id
                    quantity
                    merchandise {
                      ... on ProductVariant {
                        id
                        priceV2 {
                          amount
                          currencyCode
                        }
                        title
                        product {
                          title
                          handle
                          images(first: 1) {
                            edges {
                              node {
                                src
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
              estimatedCost {
                totalAmount {
                  amount
                  currencyCode
                }
                subtotalAmount {
                  amount
                  currencyCode
                }
                totalTaxAmount {
                  amount
                  currencyCode
                }
                totalDutyAmount {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      `;
  const response = await ShopifyData(query);
  if (!response.data.cartLinesRemove) {
    return {};
  }
  const cart = {
    ...response.data.cartLinesRemove.cart,
    lines: response.data.cartLinesRemove.cart.lines.edges.map(
      ({ node }) => node
    ),
  };

  return cart;
}

export async function getCheckoutUrl(cartId) {
  const query = `{
    cart(id: "${cartId}") {
            checkoutUrl
          }
  }`;
  const response = await ShopifyData(query);

  const cart = response.data.cart ? response.data.cart : [];

  return cart;
}

export async function associateCustomerWithCart(cartId, customer) {
  const query = `mutation {
    cartBuyerIdentityUpdate(
      cartId: "${cartId}"
      buyerIdentity: { email: "${customer}" }
    ) {
      cart {
        id
        buyerIdentity {
          email
        }
      }
    }
  }`;
  const response = await ShopifyData(query);

  const cart = response.data.cartBuyerIdentityUpdate
    ? response.data.cartBuyerIdentityUpdate.cart
    : [];

  return cart;
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

/** CUSTOMER API */
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
// forgot password
export async function customerRecover(email) {
  const query = `mutation {
  customerRecover(email: "${email}") {
    userErrors {
      field
      message
    }
  }
}`;
  const response = await ShopifyData(query);
  console.log(response);
  const customerRecover = response.data.customerRecover
    ? response.data.customerRecover
    : {};

  return customerRecover;
}
// reset password
export async function customerReset(id, resetToken, password) {
  const query = `mutation {
  customerReset(id: "${id}", input: { resetToken: "${resetToken}", password: "${password}" }) {
    userErrors {
      field
      message
    }
    customer {
      email
    }
  }
}`;
  const response = await ShopifyData(query);

  if (response.data.customerReset.userErrors.length > 0) {
    throw response.data.customerReset.userErrors;
  } else {
    customer = response.data.customerReset;
  }
  return customer;
}

export async function customerActivate(id, activationToken, password) {
  const query = `mutation {
  customerActivate(id: "${id}", input: { activationToken: "${activationToken}", password: "${password}" }) {
    userErrors {
      field
      message
    }
    customer {
      email
    }
  }
}`;
  const response = await ShopifyData(query);
  if (
    response.data.customerActivate &&
    response.data.customerActivate.userErrors.length > 0
  ) {
    throw response.data.customerActivate.userErrors;
  } else {
    const cusRes = response.data.customerActivate;
    return cusRes;
  }
}
// not used
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
  const customerQuery =
    response.data && response.data.customer ? response.data.customer : {};

  return customerQuery;
}
