import Link from 'next/link';
import { Language } from '@/config/languages';

export default function NotFound({ lang }: { lang: Language }) {
  return (
    <div className="mx-auto mt-40 text-center">
      <h2 className="mb-4 text-3xl font-bold">Post Not Found</h2>
      <Link href={`/${lang}/blog`}>
        <span className="mr-2">&larr;</span>
        <span>Go to list page</span>
      </Link>
    </div>
  );
} 