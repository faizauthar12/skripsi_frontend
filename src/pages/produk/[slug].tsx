import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

import Button from '@/components/buttons/Button';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';

import { useDidUpdate } from '@/utils/object';

import { ProductItem } from '@/types/product/product';

export default function ProductPage() {
  const router = useRouter();

  const { slug } = router.query;

  const [product, setProduct] = useState<ProductItem>();

  const handleLoadProduct = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8080/product/${slug}`);

      if (response.status === 200) {
        const data = await response.json();
        setProduct(data.data.product);
      }
    } catch (error) {
      setProduct(undefined);
    }
  }, [slug]);

  useDidUpdate(() => {
    if (slug) {
      handleLoadProduct();
    }
  }, [slug, handleLoadProduct]);

  const [quantity, setQuantity] = useState(0);

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  return (
    <Layout>
      <main>
        <Header />

        <div className='layout relative flex min-h-screen flex-col'>
          <div className='mt-5 grid grid-cols-2 gap-5 md:grid-cols-3 '>
            {/* Image */}

            {/* <div className='flex flex-col'>
              <NextImage
                useSkeleton
                className='w-320 md:w-200'
                src='/images/product.png'
                width='320'
                height='300'
                alt='Icon'
              />
            </div> */}

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
                <div className='text-sm'>{product?.ProductPrice}</div>
                <div className='text-sm'>{product?.ProductDescription} </div>

                <div className='text-sm font-bold'>SIZE</div>
                <div className='space-x-2'>
                  <Button variant='light'>L</Button>
                  <Button variant='light'>M</Button>
                  <Button variant='light'>XL</Button>
                </div>

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
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </Layout>
  );
}
