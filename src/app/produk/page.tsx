'use client';

import * as React from 'react';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import UnstyledLink from '@/components/links/UnstyledLink';
import Product from '@/components/product/Product';

import { useDidMount } from '@/utils/object';

import { ProductItem } from '@/types/product/product';

export default function ProductPage() {
  const [products, setProducts] = React.useState<ProductItem[]>([]);
  const [pageTitle, setPageTitle] = React.useState('Semua Produk');

  const handleLoadProduct = React.useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8080/product/');

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
          `http://localhost:8080/product?category=${filter}`
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
  });

  return (
    <Layout>
      <main>
        <Header />

        <div className='layout relative flex min-h-screen flex-col'>
          <div className='flex flex-row'>
            <div className='me-40 flex flex-col space-y-5'>
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
                  console.log('Filterd: Pria');
                }}
              >
                Pria
              </UnstyledLink>

              <UnstyledLink
                href='/produk'
                className=' hover:text-gray-600'
                onClick={() => {
                  handleLoadProductWithFilter('Wanita');
                  setPageTitle('Wanita');
                  console.log('Filterd: Wanita');
                }}
              >
                Wanita
              </UnstyledLink>
            </div>

            <div className='flex flex-col'>
              <div className='font-bold'>{pageTitle}</div>
              <div className='mt-[27px] grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3'>
                {products.length > 0 ? (
                  products
                    .slice(0, 4)
                    .map((product) => (
                      <Product
                        key={product.UUID}
                        uuid={product.UUID}
                        description={product.ProductDescription}
                        price={product.ProductPrice.toString()}
                        type={product.ProductCategory}
                      />
                    ))
                ) : (
                  <div>No products found.</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </Layout>
  );
}