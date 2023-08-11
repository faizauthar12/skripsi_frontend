import * as React from 'react';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

export interface LayoutProps {
  children: React.ReactNode;
  cartCount: number;
}

export default function Layout({ children, cartCount }: LayoutProps) {
  // Put Header or Footer Here

  return (
    <div>
      <Header cartCount={cartCount} />
      {children}
      <Footer />
    </div>
  );
}
