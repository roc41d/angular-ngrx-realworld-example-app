import { Profile } from '../../../../shared/interfaces/profile';

export interface Comment {
  id: number;
  body: string;
  createdAt: string;
  updatedAt: string;
  author: Profile;
}
