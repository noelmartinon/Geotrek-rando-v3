import { ActivitySuggestion } from 'modules/activitySuggestions/interface';

interface ActivityBar {
  shouldDisplay: boolean;
}

interface WelcomeBanner {
  videoUrl?: string;
  carouselUrls?: string[];
  pictureUrl?: string;
  shouldDisplayText: boolean;
}

export interface Suggestion {
  titleTranslationId: string;
  iconUrl: string;
  ids: string[];
  type: 'trek' | 'service' | 'outdoor' | 'events';
}

export interface DisplayableSuggestionCategory {
  titleTranslationId: string;
  iconUrl: string;
  suggestions: ActivitySuggestion[];
}

export interface HomePageConfig {
  welcomeBanner: WelcomeBanner;
  activityBar: ActivityBar;
  suggestions: Suggestion[];
}
