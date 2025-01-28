import { getRecordMap, mapImageUrl } from '@/libs/notion';
import { Post } from '@/types/post';
import { getBlurImage } from '@/utils/get-blur-image';

export async function getAllPostsFromNotion() {
  const allPosts: Post[] = [];
  const recordMap = await getRecordMap(process.env.NOTION_DATABASE_ID!);
  const { block, collection } = recordMap;
  const schema = Object.values(collection)[0].value.schema;
  const propertyMap: Record<string, string> = {};

  Object.keys(schema).forEach((key) => {
    propertyMap[schema[key].name] = key;
  });

  Object.keys(block).forEach((pageId) => {
    try {
      const page = block[pageId].value;
      
      if (
        page.type === 'page' &&
        page.properties &&
        page.properties[propertyMap['Slug']]
      ) {
        const { properties, last_edited_time } = page;

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
          // Get the language property key from the property map
          const languageKey = propertyMap['Language'];
          if (!languageKey) {
            console.log('Language property not found in schema');
            language = 'en'; // default to English if property not found
          } else {
            // Access the select value using Notion's property structure
            language = properties[languageKey]?.[0]?.[0] || 'en';
          }
          console.log('Language processed:', language);
        } catch (e) {
          console.error('Error processing Language:', e);
          language = 'en'; // default to English on error
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
