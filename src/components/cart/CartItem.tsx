import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MdOutlineDeleteForever } from 'react-icons/md';

import Button from '@/components/buttons/Button';
import NextImage from '@/components/NextImage';

import { formatCurrency } from '@/utils/currency/CurrencyHelper';

import { CartCookie } from '@/types/cart/CartCookie';

type SafeNumber = number | `${number}`;

type CartItemProps = {
  cart: CartCookie;
  src?: string;
  alt?: string;
  width?: SafeNumber;
  height?: SafeNumber;
  onChange?: (cart: CartCookie) => void;
  onDelete?: (productUUID: string) => void;
};

export default function CartItem({
  cart,
  src,
  alt,
  width,
  height,
  onChange,
  onDelete,
}: CartItemProps) {
  const router = useRouter();
  let subTotal = 0;
  subTotal = cart.ProductPrice * cart.ProductQuantity;

  const [quantity, setQuantity] = useState(
    cart.ProductQuantity ? cart.ProductQuantity : 0
  );

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      const updatedCart = { ...cart, ProductQuantity: quantity - 1 };
      onChange && onChange(updatedCart);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    const updatedCart = { ...cart, ProductQuantity: quantity + 1 };
    onChange && onChange(updatedCart);
  };

  const handleDelete = () => {
    onDelete && onDelete(cart.ProductUUID);
  };

  return (
    <div>
      <div className='mb-5 mt-5 grid grid-cols-4 gap-5'>
        <NextImage
          onClick={() => {
            router.push(`/produk/${cart.ProductUUID}`);
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
            <div className='font-medium'>
              {cart.ProductName ? cart.ProductName : 'Nama Produk'}
            </div>

            {/* <div>{descProduct ? descProduct : 'Deskripsi Produk'}</div> */}

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
              <div>Harga Satuan: </div>
              <div>
                {formatCurrency(
                  cart.ProductPrice,
                  undefined,
                  undefined,
                  undefined,
                  2
                )}
              </div>
            </div>
            <div className='flex flex-row justify-between'>
              <div>Harga Total : </div>
              <div>
                {' '}
                {formatCurrency(subTotal, undefined, undefined, undefined, 2)}
              </div>
            </div>
            <div className='flex flex-row justify-end'>
              <Button variant='light' onClick={handleDelete}>
                <MdOutlineDeleteForever />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
