import { FeedResponse } from './feed-response';

export interface FeedState {
  isLoading: boolean;
  error: string | null;
  data: FeedResponse | null;
}
