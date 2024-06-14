import { Comment } from './comment';

export interface CommentState {
  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;
  data: Comment[] | null;
}
