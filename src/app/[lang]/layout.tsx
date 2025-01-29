import 'katex/dist/katex.min.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'react-notion-x/src/styles.css';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { languages, type Language } from '@/config/languages';
import Header from '@/components/header/header';
import ScrollUpButton from '@/components/scroll-up-button';
import '@/styles/globals.css';
import '@/styles/paginate.css';
import { Metadata } from 'next';

export async function generateStaticParams() {
  return Object.keys(languages).map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  title: {
    default: 'Ahmet Furkan Akıncı',
    template: '%s | Ahmet Furkan Akıncı',
  },
};

export default function LangLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Language };
}) {
  const pathname = usePathname();
  const pathSuffix = pathname ? pathname.substring(3) : '';

  return (
    <>
      <Header />
      <header>
        <nav className="fixed top-5 sm:right-5 right-16 text-sm font-light">
          <Link 
            href={`/en${pathSuffix}`} 
            className={`transition-colors ${lang === 'en' ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`}
          >
            EN
          </Link>
          <span className="mx-1.5 text-gray-300">·</span>
          <Link 
            href={`/tr${pathSuffix}`}
            className={`transition-colors ${lang === 'tr' ? 'text-black' : 'text-gray-400 hover:text-gray-600'}`}
          >
            TR
          </Link>
        </nav>
      </header>
      <main>{children}</main>
      <div className="fixed bottom-12 right-10">
        <ScrollUpButton />
      </div>
    </>
  );
} 