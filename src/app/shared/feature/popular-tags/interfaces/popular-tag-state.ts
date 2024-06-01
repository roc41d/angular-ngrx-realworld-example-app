import { PopularTagType } from "../../../interfaces/popular-tag.type"

export interface PopularTagsState {
  isLoading: boolean
  error: string | null
  data: PopularTagType[] | null
}