import { apiEndpoint } from '../config'
import { BlogPostModel } from '../types/BlogPostModel'
import { BlogPostUploadInfo } from '../types/BlogPostUploadInfo'
import { BlogPostUploadResponse } from '../types/BlogPostUploadResponse'

export async function getBlogPosts(category: string): Promise<BlogPostModel[]> {
  console.log('Fetching blog posts for category: ', category)
  const response = await fetch(`${apiEndpoint}/blogCategory/${category}/posts`)
  const result = await response.json()

  return result.items
}

export async function createBlogPost(
  idToken: string,
  newPost: BlogPostUploadInfo
): Promise<BlogPostUploadResponse> {

  const reply = await fetch(
    `${apiEndpoint}/blogCategory/${newPost.category}/posts`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      },
      body: JSON.stringify({
        title: newPost.title
      })
    }
  )

  return await reply.json()
}

export async function uploadFile(uploadUrl: string, file: Buffer): Promise<void> {
  await fetch(uploadUrl, {
    method: 'PUT',
    body: file
  })
}
