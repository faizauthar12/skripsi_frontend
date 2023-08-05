import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '@/components/buttons/Button';
import CartItem from '@/components/cart/CartItem';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

type CheckoutForm = {
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  customerPhoneNumber: string;
};

export default function CheckoutPage() {
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerPhoneNumber, SetCustomerPhoneNumber] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>();

  const onSubmit = handleSubmit(
    ({ customerName, customerEmail, customerAddress, customerPhoneNumber }) => {
      console.log(
        customerName,
        customerEmail,
        customerAddress,
        customerPhoneNumber
      );
      setCustomerName(customerName);
      setCustomerEmail(customerEmail);
      setCustomerAddress(customerAddress);
      SetCustomerPhoneNumber(customerPhoneNumber);
    }
  );

  return (
    <Layout>
      <Seo templateTitle='Checkout' />

      <main>
        <Header />

        <div className='layout relative flex min-h-screen flex-col'>
          {/* Page title  */}

          <div className='font-bold'>Checkout</div>

          <div className='sd: mt-5 grid grid-cols-1 gap-5 md:grid-cols-3'>
            {/* Left */}
            <div className='col-span-2 divide-y divide-solid'>
              {/* Input */}
              <div className='mt-5 flex flex-col'>
                <form onSubmit={onSubmit} className='flex-col'>
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
              <CartItem />
              <CartItem />
              <CartItem />
              <div className='sd: sticky bottom-0 flex flex-col gap-3 bg-white '>
                <div className='flex flex-row justify-between'>
                  <div>Subtotal</div>
                  <div>IDR 260,000</div>
                </div>

                <div className='flex flex-row justify-between'>
                  <div>Total Pembayaran</div>
                  <div>IDR 260,000</div>
                </div>

                <Button variant='dark' textCenter onClick={onSubmit}>
                  Checkout
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
