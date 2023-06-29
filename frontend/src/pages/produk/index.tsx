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

          {/* <div className='static '>
            <div className='inline-block'>
              <div className='rows-3'>
                <div>Kategori</div>
                <div>Pria</div>
                <div>Wanita</div>
              </div>
            </div>
            <div className='inline-block'>bbavbaba</div>
          </div> */}

          {/* <div className='LeftPane absolute left-0 top-0 h-[909px] w-[166px]'> */}
          {/* <div className='Wanita absolute left-[-1px] top-[102px] text-[20px] font-normal text-black'>
              Wanita
            </div>
            <div className='Pria absolute left-0 top-[51px] text-[20px] font-normal text-black'>
              Pria
            </div>
            <div className='Kategori absolute left-0 top-0 text-[20px] font-bold text-black'>
              Kategori
            </div>
          </div>
          <div className='RightPane absolute left-[166px] top-0 h-[909px] w-[828px]'>
            <div className='SemuaProduk absolute left-0 top-0 text-[20px] font-bold text-black'>
              Semua Produk
            </div>
            {/* <div className='Products absolute left-0 top-[51px] inline-flex w-[828px] items-start justify-start gap-[45px]'> */}
          {/* <div className='mt-[15px] grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-4'>
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
            </div> */}
          {/* </div> */}
        </div>

        <Footer />
      </main>
    </Layout>
  );
}
