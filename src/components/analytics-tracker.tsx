'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView } from '@/utils/analytics';

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Get page type and title
    let pageType = 'page';
    let pageTitle = 'unknown';

    // Parse the pathname
    const pathParts = pathname?.split('/') || [];
    
    if (pathParts.length >= 2) {
      if (pathParts[2] === 'blog' && pathParts.length > 3) {
        pageType = 'blog_post';
        pageTitle = decodeURIComponent(pathParts[3]); // Get blog post slug
      } else {
        pageType = pathParts[2] || 'home';
        pageTitle = pageType.charAt(0).toUpperCase() + pageType.slice(1);
      }
    }

    // Track page view with enhanced information
    trackPageView({
      pageName: pathname || 'unknown',
      pageTitle: pageTitle,
      pageType: pageType,
      language: pathParts[1] || 'unknown'
    });
  }, [pathname]);

  return null;
} 