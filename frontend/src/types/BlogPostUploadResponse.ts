import { BlogPostModel } from './BlogPostModel'

export interface BlogPostUploadResponse {
  newItem: BlogPostModel
  uploadUrl: string
}
