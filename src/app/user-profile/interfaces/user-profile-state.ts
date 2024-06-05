import { Profile } from "../../shared/interfaces/profile";

export interface UserProfileState {
  data: Profile | null;
  isLoading: boolean;
  error: string | null;
}
