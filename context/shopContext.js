import { createContext, useState, useEffect } from 'react';
import {
  createCheckout,
  updateCheckout,
  checkoutCustomerAssociateV2,
  fetchCart,
  createCartWithItem,
  addItemsToCart,
  deleteItemsFromCart,
  updateItemsInCart,
  getCheckoutUrl,
  associateCustomerWithCart,
} from '../lib/shopify';

const CartContext = createContext();

export default function ShopProvider({ children }) {
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutId, setCheckoutId] = useState('');
  const [checkoutUrl, setCheckoutUrl] = useState('');
  const [cartLoading, setCartLoading] = useState(false);

  async function loadCart() {
    const cartId = localStorage.getItem('cart_id');
    if (!cartId) {
      setCart({});
      return;
    }

    const cartData = await fetchCart(cartId);

    if (cartData.lines) {
      setCart(cartData);
    }
  }

  useEffect(() => {
    loadCart();
  }, []);

  async function addToCart(addedItem) {
    setCartOpen(true);
    const cartId = localStorage.getItem('cart_id');
    let formattedCart;

    if (cartId) {
      console.log('--------------------------------');
      console.log('Adding item to existing cart...');
      console.log('--------------------------------');

      formattedCart = await addItemsToCart({
        cartId,
        itemId: addedItem.id,
        quantity: addedItem.variantQuantity,
      });
    } else {
      console.log('--------------------------------');
      console.log('Creating new cart with item...');
      console.log('--------------------------------');

      formattedCart = await createCartWithItem({
        itemId: addedItem.id,
        quantity: addedItem.variantQuantity,
      });
    }
    localStorage.setItem('cart_id', formattedCart.id);
    setCart(formattedCart);
  }

  async function removeCartItem(itemToRemove) {
    console.log(itemToRemove);

    setCartLoading(true);
    console.log('--------------------------------');
    console.log('Removing item from cart...');
    console.log('--------------------------------');
    const cartId = localStorage.getItem('cart_id');
    const updatedCart = await deleteItemsFromCart({
      cartId,
      lineIds: itemToRemove,
    });

    console.log('updated cart from deleting', updatedCart);
    setCart(updatedCart);

    localStorage.setItem('cart_id', updatedCart.id);
    setCartLoading(false);

    if (cart?.lines.length === 1) {
      setCartOpen(false);
    }
  }

  async function incrementCartItem(item, currentQuantity) {
    setCartLoading(true);
    console.log('--------------------------------');
    console.log('Updating cart with +1 item...');
    console.log('--------------------------------');
    const cartId = localStorage.getItem('cart_id');
    console.log(cartId);
    const formattedCart = await updateItemsInCart({
      cartId,
      itemId: item,
      quantity: currentQuantity + 1,
    });

    setCart(formattedCart);
    localStorage.setItem('cart_id', formattedCart.id);
    setCartLoading(false);
  }

  async function decrementCartItem(item, currentQuantity) {
    setCartLoading(true);
    setCartLoading(true);
    console.log('--------------------------------');
    console.log('Updating cart with -1 item...');
    console.log('--------------------------------');

    const cartId = localStorage.getItem('cart_id');
    const formattedCart = await updateItemsInCart({
      cartId,
      itemId: item,
      quantity: currentQuantity - 1,
    });

    setCart(formattedCart);
    localStorage.setItem('cart_id', formattedCart.id);
    setCartLoading(false);

    // if (item.variantQuantity === 1) {
    //   removeCartItem(item.id);
    // } else {
    //   let newCart = [];
    //   cart.map((cartItem) => {
    //     if (cartItem.id === item.id) {
    //       cartItem.variantQuantity--;
    //       newCart = [...cart];
    //     }
    //   });

    //   setCart(newCart);
    //   const newCheckout = await updateCheckout(checkoutId, newCart);

    //   localStorage.setItem(
    //     'checkout_id',
    //     JSON.stringify([newCart, newCheckout])
    //   );
    // }
    // setCartLoading(false);
  }

  async function clearCart() {
    const updatedCart = [];

    setCart(updatedCart);
    localStorage.removeItem('cart_id');
    // const newCheckout = await updateCheckout(checkoutId, updatedCart);

    // localStorage.setItem(
    //   'checkout_id',
    //   JSON.stringify([updatedCart, newCheckout])
    // );
  }

  async function associateCartToCustomer(token) {
    const updatedCheckout = await checkoutCustomerAssociateV2(
      checkoutId,
      token
    );
    setCheckoutUrl(updatedCheckout.webUrl);
    console.log(updatedCheckout);
    localStorage.setItem(
      'checkout_id',
      JSON.stringify([cart, updatedCheckout])
    );
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        cartOpen,
        setCartOpen,
        addToCart,
        checkoutUrl,
        removeCartItem,
        clearCart,
        cartLoading,
        incrementCartItem,
        decrementCartItem,
        associateCartToCustomer,
      }}>
      {children}
    </CartContext.Provider>
  );
}

const ShopConsumer = CartContext.Consumer;

export { ShopConsumer, CartContext };
