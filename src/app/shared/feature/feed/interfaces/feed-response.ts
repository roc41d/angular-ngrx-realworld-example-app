import { Article } from '../../../interfaces/article';

export interface FeedResponse {
  articles: Article[];
  articlesCount: number;
}
