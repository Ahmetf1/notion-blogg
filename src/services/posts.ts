import { getRecordMap, mapImageUrl } from '@/libs/notion';
import { Post } from '@/types/post';
import { getBlurImage } from '@/utils/get-blur-image';
import { ExtendedRecordMap, PropertyType, Collection, PageBlock } from 'notion-types';

interface NotionPropertyValue {
  id: string;
  type: PropertyType;
  name: string;
}

interface NotionSchema {
  [key: string]: NotionPropertyValue;
}

interface NotionProperties {
  [key: string]: Array<[string] | [string, any[]]>;
}

export async function getAllPostsFromNotion() {
  const allPosts: Post[] = [];
  const recordMap = await getRecordMap(process.env.NOTION_DATABASE_ID!);
  const { block, collection } = recordMap as ExtendedRecordMap;
  
  // Get the first collection's schema
  const collectionId = Object.keys(collection)[0];
  const schema = collection[collectionId].value.schema as NotionSchema;
  const propertyMap: Record<string, string> = {};

  Object.keys(schema).forEach((key) => {
    propertyMap[schema[key].name] = key;
  });

  Object.keys(block).forEach((pageId) => {
    try {
      const page = block[pageId].value as PageBlock;
      const properties = page.properties as NotionProperties;
      
      if (
        page.type === 'page' &&
        properties &&
        properties[propertyMap['Slug']]
      ) {
        const { last_edited_time } = page;

        // Debug log to see what properties we're working with
        console.log('Processing page:', pageId);
        console.log('Property map:', propertyMap);
        console.log('Available properties:', Object.keys(properties));

        // Check each property access individually
        let slug, title, categories, cover, date, published, language;

        try {
          slug = properties[propertyMap['Slug']]?.[0]?.[0];
          console.log('Slug processed:', slug);
        } catch (e) {
          console.error('Error processing Slug:', e);
        }

        try {
          title = properties[propertyMap['Page']]?.[0]?.[0];
          console.log('Title processed:', title);
        } catch (e) {
          console.error('Error processing Title:', e);
        }

        try {
          categories = (properties[propertyMap['Category']]?.[0]?.[0] || '').split(',').filter(Boolean);
          console.log('Categories processed:', categories);
        } catch (e) {
          console.error('Error processing Categories:', e);
        }

        try {
          cover = properties[propertyMap['Cover']]?.[0]?.[1]?.[0]?.[1];
          console.log('Cover processed:', cover);
        } catch (e) {
          console.error('Error processing Cover:', e);
        }

        try {
          date = properties[propertyMap['Date']]?.[0]?.[1]?.[0]?.[1]?.['start_date'];
          console.log('Date processed:', date);
        } catch (e) {
          console.error('Error processing Date:', e);
        }

        try {
          published = properties[propertyMap['Published']]?.[0]?.[0] === 'Yes';
          console.log('Published processed:', published);
        } catch (e) {
          console.error('Error processing Published:', e);
        }

        try {
          const languageKey = propertyMap['Language'];
          if (!languageKey) {
            console.log('Language property not found in schema');
            language = 'en';
          } else {
            language = properties[languageKey]?.[0]?.[0] || 'en';
          }
          console.log('Language processed:', language);
        } catch (e) {
          console.error('Error processing Language:', e);
          language = 'en';
        }

        // Only add the post if we have the required fields
        if (slug && title) {
          allPosts.push({
            id: pageId,
            title: title || '',
            slug: slug || '',
            categories: categories || [],
            cover: mapImageUrl(cover, page) || '',
            date: date || '',
            published: !!published,
            lastEditedAt: last_edited_time,
            language: language || 'en',
          });
        }
      }
    } catch (error) {
      console.error(`Error processing page ${pageId}:`, error);
    }
  });

  // Add blur images
  try {
    const blurImagesPromises = allPosts.map((post) => getBlurImage(post.cover));
    const blurImages = await Promise.all(blurImagesPromises);
    allPosts.forEach((post, i) => (post.blurUrl = blurImages[i].base64));
  } catch (error) {
    console.error('Error generating blur images:', error);
  }

  return allPosts;
}

export function getRelatedPosts(currentSlug: string, lang: Language) {
  const allPosts = getAllPosts();
  const currentPost = allPosts.find(post => post.slug === currentSlug);
  
  if (!currentPost) return [];

  const posts = allPosts
    .filter(post => post.language === lang) // Filter by language
    .filter(post => post.slug !== currentSlug) // Exclude current post
    .filter(post => post.published) // Only published posts
    .filter(post => 
      // Posts that share at least one category
      post.categories.some(category => 
        currentPost.categories.includes(category)
      )
    )
    .sort(() => Math.random() - 0.5) // Randomize order
    .slice(0, 3); // Get top 3

  return posts;
}

// Also update getAllPosts if needed to support language filtering
export function getAllPosts(lang?: Language) {
  // ... existing code ...
  
  // Add language filter if lang parameter is provided
  if (lang) {
    return posts.filter(post => post.language === lang);
  }
  
  return posts;
}
