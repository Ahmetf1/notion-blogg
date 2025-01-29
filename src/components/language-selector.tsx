'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type Language } from '@/config/languages';

export default function LanguageSelector({ lang }: { lang: Language }) {
  const pathname = usePathname();
  const pathSuffix = pathname ? pathname.substring(3) : '';

  return (
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
  );
} 