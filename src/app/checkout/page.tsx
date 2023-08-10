'use client';

import { getCookie, setCookie } from 'cookies-next';
import * as React from 'react';
import { useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import CartItem from '@/components/cart/CartItem';
import Layout from '@/components/layout/Layout';

import { formatCurrency } from '@/utils/currency/CurrencyHelper';
import { useDidMount } from '@/utils/object';

import { CartCookie } from '@/types/cart/CartCookie';

type CheckoutForm = {
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  customerPhoneNumber: string;
};

export default function CheckoutPage() {
  const [cartCookie, setCartCookie] = React.useState<CartCookie[]>([]);
  const [cartGrandTotal, setCartGrandTotal] = React.useState(0);

  const form = useForm<CheckoutForm>();
  const { watch, register } = form;
  const { customerName, customerAddress, customerEmail, customerPhoneNumber } =
    watch();

  const handleGetCurrentCart = React.useCallback(() => {
    const currentCart = getCookie('cart') as string;

    if (currentCart) {
      const currentCartParsed: CartCookie[] = JSON.parse(currentCart);
      setCartCookie(currentCartParsed);
    }
  }, []);

  useDidMount(() => {
    handleGetCurrentCart();
  });

  const handleEnableButton = () => {
    if (
      customerName &&
      customerAddress &&
      customerEmail &&
      customerPhoneNumber
    ) {
      return true;
    } else return false;
  };

  const calculateGrandTotal = React.useCallback(() => {
    return cartCookie.reduce((total, cart) => {
      const subtotal = cart.ProductPrice * cart.ProductQuantity;
      return total + subtotal;
    }, 0);
  }, [cartCookie]);

  const handleChangedCart = React.useCallback(
    (updatedCart: CartCookie) => {
      const updatedCartList = cartCookie.map((item) =>
        item.ProductUUID === updatedCart.ProductUUID ? updatedCart : item
      );
      setCartCookie(updatedCartList);
      const updatedCartString = JSON.stringify(updatedCartList);
      setCookie('cart', updatedCartString);
    },
    [cartCookie]
  );

  const handleDeleteCartItem = React.useCallback(
    (productUUID: string) => {
      const updatedCart = cartCookie.filter(
        (cart) => cart.ProductUUID !== productUUID
      );
      setCartCookie(updatedCart);
      const updatedCartString = JSON.stringify(updatedCart);
      setCookie('cart', updatedCartString);
    },
    [cartCookie]
  );

  React.useEffect(() => {
    setCartGrandTotal(calculateGrandTotal);
  }, [calculateGrandTotal]);

  const handleSubmit = React.useCallback(() => {
    console.log(`
      customer Name: ${customerName}\n
      customer Email: ${customerEmail}\n
      customer Phone Number: ${customerPhoneNumber}\n
      customer Address: ${customerAddress}\n
      cart grand total: ${cartGrandTotal}
    `);
  }, [
    cartGrandTotal,
    customerAddress,
    customerEmail,
    customerName,
    customerPhoneNumber,
  ]);

  const renderCartItem = React.useMemo(() => {
    return (
      <div>
        {cartCookie.length > 0 ? (
          cartCookie
            .slice(0, 4)
            .map((cart) => (
              <CartItem
                key={cart.ProductUUID}
                cart={cart}
                onChange={handleChangedCart}
                onDelete={handleDeleteCartItem}
              />
            ))
        ) : (
          <div>No Cart found.</div>
        )}
      </div>
    );
  }, [cartCookie, handleChangedCart, handleDeleteCartItem]);

  return (
    <Layout>
      <main>
        <div className='layout relative flex min-h-screen flex-col'>
          {/* Page title  */}

          <div className='font-bold'>Checkout</div>

          <div className='sd: mt-5 grid grid-cols-1 gap-5 md:grid-cols-3'>
            {/* Left */}
            <div className='col-span-2 divide-y divide-solid'>
              {/* Input */}
              <div className='mt-5 flex flex-col'>
                <form className='flex-col'>
                  <div>Nama</div>
                  <input
                    className='mb-3 w-full rounded border-2 border-gray-400'
                    {...register('customerName')}
                    placeholder='Cth: John Doe'
                  />
                  <div>Email</div>
                  <input
                    className='mb-3 w-full rounded border-2 border-gray-400'
                    {...register('customerEmail')}
                    placeholder='Cth: john@doe.com'
                  />
                  <div>Nomor Telepon</div>
                  <input
                    className='mb-3 w-full rounded border-2 border-gray-400'
                    {...register('customerPhoneNumber')}
                    placeholder='08511111111'
                  />
                  <div>Alamat</div>
                  <input
                    className='mb-3 w-full rounded border-2 border-gray-400'
                    {...register('customerAddress')}
                    placeholder='Jl. Doang ga jadian.'
                  />
                </form>
              </div>
            </div>

            {/* Right  */}
            <div className='col-span-2 bg-white py-5 md:col-span-1'>
              {renderCartItem}
              <div className='sd: sticky bottom-0 flex flex-col gap-3 bg-white '>
                <div className='flex flex-row justify-between'>
                  <div>Total Pembayaran</div>
                  <div>
                    {formatCurrency(
                      cartGrandTotal,
                      undefined,
                      undefined,
                      undefined,
                      2
                    )}
                  </div>
                </div>

                <Button
                  variant={handleEnableButton() ? 'primary' : 'light'}
                  textCenter
                  onClick={handleSubmit}
                  disabled={!handleEnableButton()}
                >
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
