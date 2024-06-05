import { Comment } from './comment';

export interface CommentState {
  isLoading: boolean;
  error: string | null;
  data: Comment[] | null;
}
