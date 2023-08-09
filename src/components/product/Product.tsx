import { useRouter } from 'next/router';

import NextImage from '@/components/NextImage';

import { formatCurrency } from '@/utils/currency/CurrencyHelper';

type SafeNumber = number | `${number}`;

type ProductProps = {
  uuid: string;
  type: string;
  description: string;
  price: string;
  src?: string;
  alt?: string;
  width?: SafeNumber;
  height?: SafeNumber;
};

export default function Product({
  uuid,
  description,
  type,
  price,
  src,
  alt,
  width,
  height,
}: ProductProps) {
  const router = useRouter();
  return (
    <div
      className='hober inline-flex h-[full] w-[241px] flex-col items-center justify-start gap-2.5 bg-white'
      onClick={() => {
        router.push(`/produk/${uuid}`);
      }}
    >
      <NextImage
        useSkeleton
        className='w-241 md:w- h-60 hover:contrast-50	'
        src={src ? src : '/images/product.png'}
        width={width ? width : '241'}
        height={height ? height : '240'}
        alt={alt ? alt : 'product'}
      />
      <div className='flex flex-col items-start justify-start gap-2.5'>
        <div className='text-[11px] font-medium text-black'>{type}</div>
        <div className='h-[41px] w-[211px] text-[11px] font-medium text-black'>
          {description}
        </div>
        <div className='w-[211px] text-[10px] font-light text-black'>
          {formatCurrency(price, undefined, undefined, undefined, 2)}
        </div>
      </div>
    </div>
  );
}
