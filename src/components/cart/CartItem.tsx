import { useRouter } from 'next/router';
import { useState } from 'react';
import { MdOutlineDeleteForever } from 'react-icons/md';

import Button from '@/components/buttons/Button';
import NextImage from '@/components/NextImage';

type SafeNumber = number | `${number}`;

type CartItemProps = {
  prodUUID: string;
  prodName?: string;
  descProduct?: string;
  prodQuantity?: number;
  subTotal?: number;
  src?: string;
  alt?: string;
  width?: SafeNumber;
  height?: SafeNumber;
};

export default function CartItem({
  prodUUID,
  prodName,
  descProduct,
  prodQuantity,
  subTotal,
  src,
  alt,
  width,
  height,
}: CartItemProps) {
  const router = useRouter();

  const [quantity, setQuantity] = useState(prodQuantity ? prodQuantity : 0);

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div>
      <div className='mb-5 mt-5 grid grid-cols-4 gap-5'>
        <NextImage
          onClick={() => {
            router.push(`/produk/${prodUUID}`);
          }}
          useSkeleton
          className='w-240 md:w-'
          src={src ? src : '/images/product.png'}
          width={width ? width : '240'}
          height={height ? height : '240'}
          alt={alt ? alt : 'product'}
        />

        <div className='col-span-3'>
          <div className='flex flex-col gap-3'>
            <div>{prodName ? prodName : 'Nama Produk'}</div>

            <div>{descProduct ? descProduct : 'Deskripsi Produk'}</div>

            <div className='flex flex-row justify-between'>
              <div>Quantity</div>
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
            <div className='flex flex-row justify-between'>
              <div>Subtotal : </div>
              <div>{subTotal ? subTotal : 0}</div>
              <Button variant='light'>
                <MdOutlineDeleteForever />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
