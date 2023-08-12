'use client';

import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import Modal from '@/components/modal/Modal';
import NextImage from '@/components/NextImage';

import { formatCurrency } from '@/utils/currency/CurrencyHelper';
import { useDidMount, useDidUpdate } from '@/utils/object';

import { CartCookie } from '@/types/cart/CartCookie';
import { ProductItem } from '@/types/product/product';
import { SizeChartCategory } from '@/types/product/SizeChart';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const router = useRouter();

  const slug = params.slug;

  const [product, setProduct] = React.useState<ProductItem>();
  const [sizeChartData, setSizeChartData] = React.useState<SizeChartCategory[]>(
    []
  );
  const [selectedSizeChart, setSelectedSizeChart] =
    React.useState<SizeChartCategory>();

  const [cartCookie, setCartCookie] = React.useState<CartCookie[]>([]);
  const [addButton, setAddButton] = React.useState(false);
  const [modalState, setModalState] = React.useState(false);

  const handleToggleModal = React.useCallback(() => {
    setModalState(!modalState);
  }, [modalState]);

  const handleGetCurrentCart = React.useCallback(() => {
    if (process.env.NODE_ENV == 'development') {
      console.log('handleGetCurrentCart');
    }
    const currentCart = getCookie('cart') as string;

    if (currentCart) {
      const currentCartParsed: CartCookie[] = JSON.parse(currentCart);
      setCartCookie(currentCartParsed);
    }
  }, []);

  // run it once in the beginning
  useDidMount(() => {
    setSizeChartData([
      { id: 1, size: 'XS' },
      { id: 2, size: 'S' },
      { id: 3, size: 'M' },
      { id: 4, size: 'L' },
      { id: 5, size: 'XL' },
    ]);
    handleGetCurrentCart();
  });

  const handleLoadProduct = React.useCallback(async () => {
    try {
      const response = await fetch(`${process.env.BASE_URL}/product/${slug}`);

      if (response.status === 200) {
        const data = await response.json();
        setProduct(data.data.product);
      }
    } catch (error) {
      setProduct(undefined);
    }
  }, [slug]);

  React.useEffect(() => {
    if (slug) {
      handleLoadProduct();

      const existingCartItem = cartCookie.find(
        (item) => item.ProductUUID === slug
      );

      if (existingCartItem) {
        setQuantity(existingCartItem.ProductQuantity);
        setSelectedSizeChart(
          sizeChartData.find(
            (size) => size.size === existingCartItem.ProductSize
          )
        );
      }
    }
  }, [slug, handleLoadProduct, cartCookie, sizeChartData]);

  const [quantity, setQuantity] = React.useState(0);

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleSelectSizeChart = React.useCallback(
    (sizeType: SizeChartCategory) => {
      setSelectedSizeChart(
        selectedSizeChart === sizeType ? undefined : sizeType
      );
    },
    [selectedSizeChart]
  );

  const renderSizeChart = React.useMemo(
    () =>
      sizeChartData.map((size) => (
        <Button
          key={size.id}
          variant={selectedSizeChart === size ? 'primary' : 'light'}
          onClick={() => handleSelectSizeChart(size)}
        >
          {size.size}
        </Button>
      )),
    [handleSelectSizeChart, selectedSizeChart, sizeChartData]
  );

  const handleChangedCart = React.useCallback(() => {
    if (product && selectedSizeChart && quantity > 0) {
      if (process.env.NODE_ENV == 'development') {
        console.log('handleChangedCart');
      }
      const updatedCart = cartCookie.map((item) => {
        if (item.ProductUUID === product.UUID) {
          return {
            ...item,
            ProductQuantity: quantity,
            ProductSize: selectedSizeChart.size,
          };
        }
        return item;
      });

      setCartCookie(updatedCart);
      if (quantity > 0 && selectedSizeChart) {
        setAddButton(true);
      } else {
        setAddButton(false);
      }
    }
  }, [product, quantity, selectedSizeChart, cartCookie]);

  const handleSaveCart = React.useCallback(() => {
    if (process.env.NODE_ENV == 'development') {
      console.log('handleSaveCart');
    }
    if (product && selectedSizeChart && quantity > 0) {
      const updatedCartCookie = cartCookie.filter(
        (item) => item.ProductUUID !== product.UUID
      );

      updatedCartCookie.push({
        ProductUUID: product.UUID,
        ProductName: product.ProductName,
        ProductQuantity: quantity,
        ProductSize: selectedSizeChart.size,
        ProductPrice: product.ProductPrice,
      });

      setCartCookie(updatedCartCookie);

      const parsedCartCookie = JSON.stringify(updatedCartCookie);
      setCookie('cart', parsedCartCookie);
    }
  }, [cartCookie, product, quantity, selectedSizeChart]);

  // save cookies if any selectedSizeChart and Quantity changed
  useDidUpdate(() => {
    if (process.env.NODE_ENV == 'development') {
      console.log(cartCookie);
    }
    handleChangedCart();
  }, [selectedSizeChart, quantity]);

  const handleAddToCart = React.useCallback(() => {
    handleChangedCart();
    handleSaveCart();
    handleToggleModal();
  }, [handleChangedCart, handleSaveCart, handleToggleModal]);

  return (
    <Layout cartCount={cartCookie.length}>
      <main>
        <Modal
          isVisible={modalState}
          onClose={handleToggleModal}
          content={`${product?.ProductName} sejumlah ${quantity} telah berhasil ditambahkan ke keranjang`}
          title='Barang berhasil ditambahkan'
        />
        <div className='layout relative flex min-h-screen flex-col'>
          <div className='mt-5 grid grid-cols-2 gap-5 md:grid-cols-3 '>
            {/* Image */}

            <NextImage
              useSkeleton
              className='w-320 md:w-200'
              src='/images/product.png'
              width='320'
              height='300'
              alt='Icon'
            />

            {/* Deskripsi */}

            <div className='col-span-2'>
              <div className='me-28 flex-1 space-y-5'>
                <div>{product?.ProductName}</div>
                <div className='text-sm'>
                  {formatCurrency(
                    product?.ProductPrice,
                    undefined,
                    undefined,
                    undefined,
                    2
                  )}
                </div>
                <div className='text-sm'>{product?.ProductDescription} </div>

                <div className='text-sm font-bold'>SIZE</div>
                <div className='flex space-x-2'>{renderSizeChart}</div>

                {/* Quantity */}

                <div className='text-sm font-bold'>Quantity</div>
                <div className='inline-block'>
                  <div className='just rounded border border-gray-200'>
                    <button
                      type='button'
                      className='w-6 leading-10 text-gray-600 transition hover:opacity-75'
                      onClick={handleDecrement}
                    >
                      -
                    </button>

                    <input
                      type='number'
                      id='Quantity'
                      value={quantity}
                      className='w-10 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none'
                    />

                    <button
                      type='button'
                      className='w-6 leading-10 text-gray-600 transition hover:opacity-75'
                      onClick={handleIncrement}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div>
                  <Button
                    variant={addButton ? 'primary' : 'light'}
                    disabled={!addButton}
                    textCenter
                    onClick={handleAddToCart}
                  >
                    Tambah Produk
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
