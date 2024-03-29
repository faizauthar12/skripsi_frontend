import { Home, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import UnstyledLink from '@/components/links/UnstyledLink';

export interface HeaderProps {
  cartCount: number;
}

export default function Header({ cartCount }: HeaderProps) {
  const router = useRouter();

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
              {cartCount > 0 && (
                <div className='absolute right-0 top-0 flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white'>
                  {cartCount}
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
