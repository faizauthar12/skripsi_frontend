import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import Button from '@/components/buttons/Button';
import CartItem from '@/components/cart/CartItem';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import PrimaryLink from '@/components/links/PrimaryLink';
import Seo from '@/components/Seo';

import { formatCurrency } from '@/utils/currency/CurrencyHelper';
import { useDidMount } from '@/utils/object';

import { CartCookie } from '@/types/cart/CartCookie';

export default function CartPage() {
  const router = useRouter();

  const [cartCookie, setCartCookie] = useState<CartCookie[]>([]);
  const [checkoutButton, setCheckoutButton] = useState(false);

  const handleGetCurrentCart = useCallback(() => {
    console.log('handleGetCurrentCart');
    const currentCart = getCookie('cart') as string;

    if (currentCart) {
      const currentCartParsed: CartCookie[] = JSON.parse(currentCart);
      setCartCookie(currentCartParsed);
      setCheckoutButton(true);
    }
  }, []);

  const handleGrandTotal = useCallback(() => {
    return cartCookie.reduce((total, cart) => {
      const subtotal = cart.ProductPrice * cart.ProductQuantity;
      return total + subtotal;
    }, 0);
  }, [cartCookie]);

  useDidMount(() => {
    handleGetCurrentCart();
  });

  useEffect(() => {
    console.log(cartCookie);
    if (cartCookie.length > 0) {
      setCheckoutButton(true);
    } else {
      setCheckoutButton(false);
    }
  }, [cartCookie]);

  const handleChangedCart = useCallback(
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

  const handleDeleteCartItem = useCallback(
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

  const renderCartItem = useMemo(() => {
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
          <div></div>
        )}
      </div>
    );
  }, [cartCookie, handleChangedCart, handleDeleteCartItem]);

  return (
    <Layout>
      <Seo templateTitle='Keranjang' />

      <main>
        <Header />

        <div className='layout relative flex min-h-screen flex-col'>
          {/* Page title  */}

          <div className='font-bold'>Keranjang</div>

          <div className='sd: mt-5 grid grid-cols-1 gap-5 md:grid-cols-3 '>
            <div className='col-span-2 divide-y divide-solid'>
              <div className='flex justify-between'>
                {cartCookie.length > 0 ? (
                  `Terdapat ${cartCookie.length} Barang`
                ) : (
                  <div>Tidak ada barang</div>
                )}
                <PrimaryLink href='/produk'> + Belanja Lagi</PrimaryLink>
              </div>

              <div className='mt-5 flex flex-col divide-y divide-solid'>
                {renderCartItem}
              </div>
            </div>

            <div className='sd: sticky bottom-0 col-span-2 bg-white py-5 md:col-span-1'>
              <div className='flex flex-col gap-3 '>
                <div className='flex flex-row justify-between'>
                  <div>Total Pembayaran</div>
                  <div>
                    {formatCurrency(
                      handleGrandTotal(),
                      undefined,
                      undefined,
                      undefined,
                      2
                    )}
                  </div>
                </div>

                <Button
                  variant={checkoutButton ? 'primary' : 'light'}
                  textCenter
                  onClick={() => {
                    if (checkoutButton === true) {
                      router.push('/checkout');
                    } else {
                      router.push('/produk');
                    }
                  }}
                >
                  {checkoutButton ? 'Beli' : 'Pilih Produk'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </Layout>
  );
}
