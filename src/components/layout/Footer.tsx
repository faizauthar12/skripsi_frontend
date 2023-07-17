import UnderlineLink from '../links/UnderlineLink';

export default function Footer() {
  return (
    <footer className='inset-x-0 bottom-0 mb-[10px] mt-[20px] text-center text-gray-700'>
      © {new Date().getFullYear()} By{' '}
      <UnderlineLink href='https://github.com/faizauthar12'>
        Muhammad Alfaiz Khisma Authar
      </UnderlineLink>
    </footer>
  );
}
