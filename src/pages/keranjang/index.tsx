import Button from '@/components/buttons/Button';
import CartItem from '@/components/cart/CartItem';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import PrimaryLink from '@/components/links/PrimaryLink';
import Seo from '@/components/Seo';

export default function CartPage() {
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
                <div>Terdapat 1 Barang</div>
                <PrimaryLink href='/produk'> + Belanja Lagi</PrimaryLink>
              </div>

              <div className='mt-5 flex flex-col divide-y divide-solid'>
                <CartItem />
                <CartItem />
                <CartItem />
              </div>
            </div>

            <div className='sd: sticky bottom-0 col-span-2 bg-white py-5 md:col-span-1'>
              <div className='flex flex-col gap-3 '>
                <div className='flex flex-row justify-between'>
                  <div>Subtotal</div>
                  <div>IDR 260,000</div>
                </div>

                <div className='flex flex-row justify-between'>
                  <div>Total Pembayaran</div>
                  <div>IDR 260,000</div>
                </div>

                <Button variant='dark' textCenter>
                  Beli
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
