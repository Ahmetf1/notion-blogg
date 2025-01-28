import React from 'react';
import { Metadata } from 'next';

import CategoryFilter from '@/components/filter/category-filter';
import SearchBar from '@/components/filter/search-bar';
import PostsGrid from '@/components/posts/posts-grid';
import { getAllPostsFromNotion } from '@/services/posts';
import { toUniqueArray } from '@/utils/to-unique-array';
import { Language } from '@/config/languages';
import { getDictionary } from '@/dictionaries';

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Language };
}): Promise<Metadata> {
  const dict = await getDictionary(lang);
  
  return {
    title: 'Blog',
    description: 'All posts are created by notion ai.',
  };
}

export default async function BlogPage({
  params: { lang },
}: {
  params: { lang: Language };
}) {
  const allPosts = await getAllPostsFromNotion();
  
  // Filter posts by language
  const languagePosts = allPosts.filter(
    (post) => post.published && post.language === lang
  );

  const allCategories = toUniqueArray(
    languagePosts.map((post) => post.categories).flat()
  ).sort();

  return (
    <>
      <section className="mb-16 mt-0 space-y-8 md:mt-20">
        <SearchBar />
        <CategoryFilter allCategories={allCategories} />
      </section>
      <PostsGrid allPosts={languagePosts} />
    </>
  );
} 