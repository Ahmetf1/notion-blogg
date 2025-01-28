import { notFound } from 'next/navigation';
import { Language } from '@/config/languages';
import { getAllPostsFromNotion } from '@/services/posts';
import NotFound from './not-found';

export async function generateStaticParams() {
  const allPosts = await getAllPostsFromNotion();
  
  return allPosts
    .filter((post) => post.published)
    .map((post) => ({
      lang: post.language,
      slug: post.slug,
    }));
}

export default async function BlogPost({
  params: { lang, slug },
}: {
  params: { lang: Language; slug: string };
}) {
  const allPosts = await getAllPostsFromNotion();
  const post = allPosts.find(
    (p) => p.slug === slug && p.language === lang && p.published
  );

  if (!post) {
    return <NotFound lang={lang} />;
  }

  // ... rest of your blog post rendering code ...
} 