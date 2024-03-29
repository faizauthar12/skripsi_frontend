'use client';

import { getCookie } from 'cookies-next';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import UnstyledLink from '@/components/links/UnstyledLink';
import Product from '@/components/product/Product';

import { useDidMount } from '@/utils/object';

import { CartCookie } from '@/types/cart/CartCookie';
import { ProductItem } from '@/types/product/product';

export default function ProductPage() {
  const [cartCookie, setCartCookie] = React.useState<CartCookie[]>([]);
  const [products, setProducts] = React.useState<ProductItem[]>([]);
  const [pageTitle, setPageTitle] = React.useState('Semua Produk');

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

  const handleLoadProduct = React.useCallback(async () => {
    try {
      const response = await fetch(`${process.env.BASE_URL}/product/`);

      if (response.status === 200) {
        const data = await response.json();
        setProducts(data.data.products);
      } else {
        setProducts([]);
      }
    } catch (error) {
      setProducts([]);
    }
  }, []);

  const handleLoadProductWithFilter = React.useCallback(
    async (filter: string) => {
      try {
        const response = await fetch(
          `${process.env.BASE_URL}/product/?category=${filter}`
        );

        if (response.status === 200) {
          const data = await response.json();
          setProducts(data.data.products);
        } else {
          setProducts([]);
        }
      } catch (error) {
        setProducts([]);
      }
    },
    []
  );

  useDidMount(() => {
    handleLoadProduct();
    handleGetCurrentCart();
  });

  return (
    <Layout cartCount={cartCookie.length}>
      <main>
        <div className='layout relative flex min-h-screen flex-col'>
          <div className='flex flex-row'>
            {/* Left panel */}
            <div className='me-10	flex min-w-fit flex-col space-y-5 md:me-20 lg:me-40'>
              <UnstyledLink
                href='/produk'
                className='font-bold hover:text-gray-600'
                onClick={() => {
                  handleLoadProduct();
                  setPageTitle('Semua Produk');
                }}
              >
                Kategori
              </UnstyledLink>

              <UnstyledLink
                href='/produk'
                className=' hover:text-gray-600'
                onClick={() => {
                  handleLoadProduct();
                  setPageTitle('Semua Produk');
                }}
              >
                Semua
              </UnstyledLink>

              <UnstyledLink
                href='/produk'
                className=' hover:text-gray-600'
                onClick={() => {
                  handleLoadProductWithFilter('pria');
                  setPageTitle('Pria');
                  if (process.env.NODE_ENV == 'development') {
                    console.log('Filterd: Pria');
                  }
                }}
              >
                Pria
              </UnstyledLink>

              <UnstyledLink
                href='/produk'
                className=' hover:text-gray-600'
                onClick={() => {
                  handleLoadProductWithFilter('wanita');
                  setPageTitle('Wanita');
                  if (process.env.NODE_ENV == 'development') {
                    console.log('Filterd: Wanita');
                  }
                }}
              >
                Wanita
              </UnstyledLink>
            </div>

            <div className='flex flex-col'>
              <div className='font-bold'>{pageTitle}</div>
              <div className='mt-[27px] grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3'>
                {products && products.length > 0 ? (
                  products.map((product) => (
                    <Product
                      key={product.UUID}
                      uuid={product.UUID}
                      description={product.ProductDescription}
                      price={product.ProductPrice.toString()}
                      name={product.ProductName}
                    />
                  ))
                ) : (
                  <div>No products found.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
