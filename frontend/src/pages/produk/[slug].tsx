import { useRouter } from 'next/router';
import { useState } from 'react';

import Button from '@/components/buttons/Button';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import NextImage from '@/components/NextImage';

export default function ProductPage() {
  const router = useRouter();

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

        <div className='layout mt-10 flex min-h-screen'>
          <div className='flex flex-row'>
            {/* Image */}
            <div className='me-20 flex-none'>
              <NextImage
                useSkeleton
                className='w-320 md:w-200'
                src='/images/product.png'
                width='320'
                height='300'
                alt='Icon'
              />
            </div>

            {/* Deskripsi */}
            <div className='me-28 flex-1 space-y-5'>
              <div>{'<Super Thin> Case for iPhone 13 Series'}</div>
              <div className='text-sm'>IDR 263,000</div>
              <div className='text-sm'>
                {
                  "Beyond Indonesia's first collection that embodies our belief in simplicity and functionality. The thinnest case in the market, specially craftedf using < B > tech material. Your everyday essential. No added bulk."
                }
              </div>

              {/* Size */}
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
                    className='w-10 leading-10 text-gray-600 transition hover:opacity-75'
                    onClick={handleDecrement}
                  >
                    -
                  </button>

                  <input
                    type='number'
                    id='Quantity'
                    value={quantity}
                    className='w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none'
                  />

                  <button
                    type='button'
                    className='w-10 leading-10 text-gray-600 transition hover:opacity-75'
                    onClick={handleIncrement}
                  >
                    +
                  </button>
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
