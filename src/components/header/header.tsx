import Link from 'next/link';

import LanguageSelector from '@/components/language-selector';
import NavLink from '@/components/header/nav-link';
import ThemeToggle from '@/components/theme-toggle';
import { type Language } from '@/config/languages';

const NAV_ITEMS = [
  { path: 'blog', name: 'Blog' },
  { path: 'about', name: 'About' },
  { path: 'contact', name: 'Contact' },
];

interface HeaderProps {
  lang: Language;
}

export default function Header({ lang }: HeaderProps) {
  return (
    <nav className="flex flex-col justify-between py-12 md:flex-row">
      <Link href="/" className="self-start md:self-auto">
        <h1 className="text-3xl font-bold">Ahmet Furkan Akıncı</h1>
      </Link>
      <div className="my-6 flex space-x-8 self-center md:my-0 md:self-auto">
        <ul className="flex space-x-8">
          {NAV_ITEMS.map((item) => (
            <li
              key={item.path}
              className="text-secondary hover:text-primary whitespace-nowrap py-2 text-lg font-medium transition-all duration-300"
            >
              <NavLink path={item.path}>{item.name}</NavLink>
            </li>
          ))}
        </ul>
        <div className="flex items-center space-x-4">
          <LanguageSelector lang={lang} />
          <div className="absolute right-4 top-20 md:static md:right-auto md:top-auto">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
