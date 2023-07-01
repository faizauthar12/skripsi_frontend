import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import UnstyledLink from '@/components/links/UnstyledLink';
import Product from '@/components/product/Product';
import Seo from '@/components/Seo';

export default function ProductPage() {
  return (
    <Layout>
      <Seo templateTitle='Produk' />

      <main>
        <Header />

        <div className='layout relative flex min-h-screen flex-col'>
          <div className='flex flex-row'>
            <div className='me-40 flex flex-col space-y-5'>
              <UnstyledLink
                href='/produk'
                className='font-bold hover:text-gray-600'
              >
                Kategori
              </UnstyledLink>

              <UnstyledLink href='/produk' className=' hover:text-gray-600'>
                Pria
              </UnstyledLink>

              <UnstyledLink href='/produk' className=' hover:text-gray-600'>
                Wanita
              </UnstyledLink>
            </div>

            <div className='flex flex-col'>
              <div className='font-bold'>Semua Produk</div>
              <div className='mt-[27px] grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3'>
                <Product
                  description='Lorem ipsum dolor sit amet consectetur.'
                  price='300.0000'
                  type='aksesoris jamtangan'
                />

                <Product
                  description='Lorem ipsum dolor sit amet consectetur.'
                  price='300.0000'
                  type='aksesoris jamtangan'
                />

                <Product
                  description='Lorem ipsum dolor sit amet consectetur.'
                  price='300.0000'
                  type='aksesoris jamtangan'
                />

                <Product
                  description='Lorem ipsum dolor sit amet consectetur.'
                  price='300.0000'
                  type='aksesoris jamtangan'
                />

                <Product
                  description='Lorem ipsum dolor sit amet consectetur.'
                  price='300.0000'
                  type='aksesoris jamtangan'
                />

                <Product
                  description='Lorem ipsum dolor sit amet consectetur.'
                  price='300.0000'
                  type='aksesoris jamtangan'
                />

                <Product
                  description='Lorem ipsum dolor sit amet consectetur.'
                  price='300.0000'
                  type='aksesoris jamtangan'
                />

                <Product
                  description='Lorem ipsum dolor sit amet consectetur.'
                  price='300.0000'
                  type='aksesoris jamtangan'
                />

                <Product
                  description='Lorem ipsum dolor sit amet consectetur.'
                  price='300.0000'
                  type='aksesoris jamtangan'
                />

                <Product
                  description='Lorem ipsum dolor sit amet consectetur.'
                  price='300.0000'
                  type='aksesoris jamtangan'
                />

                <Product
                  description='Lorem ipsum dolor sit amet consectetur.'
                  price='300.0000'
                  type='aksesoris jamtangan'
                />

                <Product
                  description='Lorem ipsum dolor sit amet consectetur.'
                  price='300.0000'
                  type='aksesoris jamtangan'
                />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </Layout>
  );
}
