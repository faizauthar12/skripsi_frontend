import { useRouter } from 'next/navigation';

import { useWindowSize } from '@/lib/windows';

import NextImage from '@/components/NextImage';

import { formatCurrency } from '@/utils/currency/CurrencyHelper';

type SafeNumber = number | `${number}`;

type ProductProps = {
  uuid: string;
  name: string;
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
  name,
  price,
  src,
  alt,
  width,
  height,
}: ProductProps) {
  const router = useRouter();
  const getWidth = useWindowSize().width;

  return (
    <div
      className='flex flex-col items-center justify-start gap-2.5'
      onClick={() => {
        router.push(`/produk/${uuid}`);
      }}
    >
      <NextImage
        useSkeleton
        className='w-100 md:w-240 hover:contrast-50'
        src={src ? src : '/images/product.png'}
        width={width ? width : getWidth / 4}
        height={height ? height : 240}
        alt={alt ? alt : 'product'}
      />
      <div className='flex flex-col items-start justify-start gap-2.5'>
        <div className='text-[11px] font-medium text-black'>{name}</div>
        <div className='h-[41px] w-[211px] text-[11px] text-black'>
          {description}
        </div>
        <div className='w-[211px] text-[10px] font-light text-black'>
          {formatCurrency(price, undefined, undefined, undefined, 2)}
        </div>
      </div>
    </div>
  );
}
