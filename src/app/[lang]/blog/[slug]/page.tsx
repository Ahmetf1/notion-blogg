import { Language } from '@/config/languages';
import { getAllPostsFromNotion } from '@/services/posts';
import NotFound from './not-found';
import NotionPage from '@/components/notion-page';
import RelatedPosts from '@/components/posts/related-posts';
import { getRecordMap } from '@/libs/notion';
import { Post } from '@/types/post';
import Image from 'next/image';

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

  const relatedPosts: Post[] = allPosts.filter(
    (p) =>
      p.slug !== slug &&
      p.published &&
      p.categories.some((v) => post.categories.includes(v))
  );

  const recordMap = await getRecordMap(post.id);

  return (
    <>
      <article
        data-revalidated-at={new Date().getTime()}
        className="mt-4 flex flex-col items-center md:mt-20"
      >
        <div className="relative aspect-[3/2] w-[90vw] max-w-[900px]">
          <Image
            src={post.cover}
            alt="cover"
            fill
            style={{ objectFit: 'contain' }}
            placeholder="blur"
            blurDataURL={post.blurUrl}
          />
        </div>
        <NotionPage post={post} recordMap={recordMap} />
      </article>
      <RelatedPosts posts={relatedPosts} lang={lang} />
    </>
  );
} 