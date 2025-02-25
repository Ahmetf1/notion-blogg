import { logEvent } from 'firebase/analytics';
import { analytics } from '@/firebase/firebase';

interface PageViewParams {
  pageName: string;
  pageTitle: string;
  pageType: string;
  language: string;
}

export const trackPageView = (params: PageViewParams) => {
  if (!analytics) return;
  
  try {
    logEvent(analytics, 'page_view', {
      page_title: params.pageTitle,
      page_location: window.location.href,
      page_path: params.pageName,
      page_type: params.pageType,
      language: params.language,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
}; 