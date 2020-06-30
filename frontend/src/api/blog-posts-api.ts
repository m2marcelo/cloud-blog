import { BlogPostModel } from '../types/BlogPostModel'
import { apiEndpoint } from '../config'
import { BlogPostUploadInfo } from '../types/BlogPostUploadInfo'

export async function getCategories(): Promise<BlogPostModel[]> {
  console.log('Fetching blog categories')

  const response = await fetch(`${apiEndpoint}/blogPosts`)
  const result = await response.json()

  return result.items
}

export async function createBlogPost(
  idToken: string,
  newPost: BlogPostUploadInfo
): Promise<BlogPostModel> {
  const reply = await fetch(`${apiEndpoint}/blogPosts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
    body: JSON.stringify({
      name: newPost.title,
      description: newPost.content
    })
  })
  const result = await reply.json()
  return result.newBlogItem
}
