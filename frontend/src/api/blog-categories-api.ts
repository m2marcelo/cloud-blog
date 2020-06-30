import { BlogCategoriesModel } from '../types/BlogCategoriesModel'
import { apiEndpoint } from '../config'
import { BlogCategoryUploadInfo } from '../types/BlogCategoryUploadInfo'

export async function getAllCategories(): Promise<BlogCategoriesModel[]> {
  console.log('Fetching blog categories')

  const response = await fetch(`${apiEndpoint}/blogCategory`)
  const result = await response.json()

  return result.items
}

export async function createBlogCategory(
  idToken: string,
  newPost: BlogCategoryUploadInfo
): Promise<BlogCategoriesModel> {
  const reply = await fetch(`${apiEndpoint}/blogCategory`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
    body: JSON.stringify({
      title: newPost.title,
      content: newPost.content
    })
  })
  const result = await reply.json()
  return result.newBlogItem
}
