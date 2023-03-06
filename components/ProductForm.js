import { useState, useEffect, useContext } from 'react';
import { formatter } from '../utils/helpers';
import ProductOptions from './ProductOptions';
import { CartContext } from '../context/shopContext';
import axios from 'axios';
import useSWR from 'swr';

// setup inventory fetcher
const fetchInventory = (url, id) =>
  axios
    .get(url, {
      params: {
        id: id,
      },
    })
    .then((res) => res.data);

export default function ProductForm({ product }) {
  const { data: productInventory } = useSWR(
    ['/api/available', product.handle],
    (url, id) => fetchInventory(url, id),
    { errorRetryCount: 3 }
  );

  const [available, setAvailable] = useState(true);

  const { addToCart } = useContext(CartContext);

  const allVariantOptions = product.variants.edges?.map((variant) => {
    const allOptions = {};

    variant.node.selectedOptions.map((item) => {
      allOptions[item.name] = item.value;
    });

    return {
      id: variant.node.id,
      title: product.title,
      handle: product.handle,
      image: variant.node.image?.url,
      options: allOptions,
      variantTitle: variant.node.title,
      variantPrice: variant.node.priceV2.amount,
      variantQuantity: 1,
    };
  });

  const defaultValues = {};
  product.options.map((item) => {
    defaultValues[item.name] = item.values[0];
  });

  const [selectedVariant, setSelectedVariant] = useState(allVariantOptions[0]);
  const [selectedOptions, setSelectedOptions] = useState(defaultValues);

  function setOptions(name, value) {
    setSelectedOptions((prevState) => {
      return { ...prevState, [name]: value };
    });

    const selection = {
      ...selectedOptions,
      [name]: value,
    };

    allVariantOptions.map((item) => {
      if (JSON.stringify(item.options) === JSON.stringify(selection)) {
        setSelectedVariant(item);
      }
    });
  }

  useEffect(() => {
    if (productInventory) {
      const checkAvailable = productInventory?.variants.edges.filter(
        (item) => item.node.id === selectedVariant.id
      );

      if (checkAvailable[0]?.node.availableForSale) {
        setAvailable(true);
      } else {
        setAvailable(false);
      }
    }
  }, [productInventory, selectedVariant]);

  return (
    <div className='flex flex-col w-full p-4 rounded-2xl'>
      <p className='uppercase text-sm text-slate-400 mb-3'>{product.vendor}</p>
      <h2 className='text-3xl font-semibold capitalize'>{product.title}</h2>
      <span className='py-6'>
        {product.previousCustomOrder && <>Starting at: </>}
        {formatter.format(product.variants.edges[0].node.priceV2.amount)} USD
      </span>
      {product.options.map(({ name, values }) => {
        if (name !== 'Title') {
          return (
            <ProductOptions
              key={`key-${name}`}
              name={name}
              values={values}
              selectedOptions={selectedOptions}
              setOptions={setOptions}
              selectedVariant={selectedVariant}
              productInventory={productInventory}
              available={available}
            />
          );
        }
      })}
      {available && !product.previousCustomOrder && (
        <button
          onClick={() => {
            addToCart(selectedVariant);
          }}
          className='px-4 py-3 mt-3 bg-sky-800 rounded-lg  hover:bg-sky-900 text-white'>
          Add To Cart
        </button>
      )}
      {product.previousCustomOrder && (
        <div className='font-medium text-sky-700'>
          <a href='#' className='underline underline-offset-4'>
            Interested in designing your own? Inquire here
          </a>
        </div>
      )}
      {!available && !product.previousCustomOrder && (
        <button className='px-2 py-3 mt-3 text-slate-800 border-[1px] border-slate-800 rounded-lg cursor-not-allowed'>
          Sold out!
        </button>
      )}
    </div>
  );
}
