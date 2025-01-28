import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function NotFound() {
  const params = useParams();
  const lang = params?.lang ?? 'en';
  
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