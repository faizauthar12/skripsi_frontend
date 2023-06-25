import { useState } from 'react';

import { useWindowSize } from '@/lib/helper';

import NextImage from '@/components/NextImage';

type CarouselProps = {
  images: string[];
};

export default function Carousel({ images }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const size = useWindowSize();
  const src = '/images/large-og.png';

  return (
    <div>
      <div className='w-full'>
        <div id='item1' className='carousel-item w-full'>
          <NextImage
            useSkeleton
            className='w-full'
            src={src}
            alt='product'
            width={size.width}
            height={size.height / 3}
          />
        </div>
      </div>
      <div className='flex w-full justify-center gap-2 py-2'>
        <a href='#item1' className='btn btn-xs'>
          1
        </a>
      </div>
    </div>
  );
}
