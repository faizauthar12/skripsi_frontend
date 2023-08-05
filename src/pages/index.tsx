import * as React from 'react';
import { useState } from 'react';

import Carousel from '@/components/carousel/Carousel';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import Product from '@/components/product/Product';
import Seo from '@/components/Seo';

import { useDidMount } from '@/utils/object';

import { ProductItem } from '@/types/product/product';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  const [products, setProducts] = useState<ProductItem[]>([]);

  const handleLoadProduct = React.useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8080/product/');

      if (response.status === 200) {
        const data = await response.json();
        setProducts(data.data.products);
      }
    } catch (error) {
      setProducts([]);
    }
  }, []);

  useDidMount(() => {
    handleLoadProduct();
  });

  return (
    <Layout>
      <Seo templateTitle='Beranda' />

      <main>
        <Header />

        <div className='layout relative flex min-h-screen flex-col'>
          <Carousel images={[]} />

          {/*Produk Unggulan */}
          <div className='flex-col'>
            <div className='text-[20px] font-normal text-black'>
              Produk Unggulan
            </div>
            <div className='mt-[15px] grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-4'>
              {products.length > 0 ? (
                products
                  .slice(0, 4)
                  .map((product) => (
                    <Product
                      key={product.UUID}
                      description={product.ProductDescription}
                      price={product.ProductPrice.toString()}
                      type={product.ProductCategory}
                    />
                  ))
              ) : (
                <div>No products found.</div>
              )}
            </div>

            <div className='mt-[64px] text-right font-normal text-black '>
              <ArrowLink href='/produk'>Lihat Semua Produk</ArrowLink>
            </div>
          </div>

          {/*About */}
          <div className='my-[150px] text-center text-[36px] font-normal text-black'>
            <div className='text-[36px] font-normal text-black'>About</div>
            <div className='mt-10 text-center text-[24px] font-normal text-black'>
              Lorem ipsum dolor sit amet consectetur. Etiam in varius bibendum
              id bibendum. Aliquam neque elementum mi porta. Eu egestas dui
              nulla erat. Rhoncus vitae et in urna nec lorem. Pharetra mauris
              placerat commodo placerat in malesuada. Viverra elit mauris
              consectetur mattis curabitur tincidunt id. Odio faucibus aliquet
              sit tellus quam. Faucibus gravida est a pellentesque ac et diam
              ornare pellentesque. Sit turpis leo eros est mauris tristique
              adipiscing. Quis eget pulvinar pharetra egestas bibendum proin.
              Proin vel arcu consequat sed fermentum pellentesque. Amet non id
              ullamcorper felis. Pulvinar etiam netus diam varius diam elementum
              elit ullamcorper id. Sit nisi facilisi viverra eros. Quisque
              pellentesque neque at urna. Quis velit neque ligula consequat
              venenatis non. Nibh gravida cras nisl sagittis. Sed cursus elit
              libero lorem non amet. Diam platea at ornare ac tincidunt
              consequat. Lacinia mauris mauris volutpat orci.
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </Layout>
  );
}
