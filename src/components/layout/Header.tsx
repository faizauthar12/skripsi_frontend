import { getCookie } from 'cookies-next';
import { Home, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import UnstyledLink from '@/components/links/UnstyledLink';

import { CartCookie } from '@/types/cart/CartCookie';

export default function Header() {
  const router = useRouter();

  const [cartCookie, setCartCookie] = React.useState<CartCookie[]>([]);

  const handleGetCurrentCart = React.useCallback(() => {
    if (process.env.NODE_ENV == 'development') {
      console.log('Header: handleGetCurrentCart');
    }

    const currentCart = getCookie('cart') as string;

    if (currentCart) {
      const currentCartParsed: CartCookie[] = JSON.parse(currentCart);
      setCartCookie(currentCartParsed);
    }
  }, []);

  React.useEffect(() => {
    handleGetCurrentCart();
  }, [handleGetCurrentCart]);

  return (
    <header className='sticky top-0 z-50 bg-white'>
      <div className='layout flex h-14 items-center justify-between'>
        <UnstyledLink
          href='/'
          className='flex-start flex items-center gap-1 font-bold hover:text-gray-600'
        >
          <Home />
          Beranda
        </UnstyledLink>

        <nav>
          <ul className='flex items-center justify-between space-x-4'>
            <li>
              <UnstyledLink href='/produk' className='hover:text-gray-600'>
                Produk
              </UnstyledLink>
            </li>

            <li className='relative rounded-full border-2 border-transparent px-2 py-3 transition duration-150 ease-in-out hover:opacity-50'>
              <ShoppingBag onClick={() => router.push('/keranjang')} />
              <div className='absolute right-0 top-0 flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white'>
                {cartCookie.length}
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
