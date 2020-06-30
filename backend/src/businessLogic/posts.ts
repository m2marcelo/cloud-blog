import * as uuid from 'uuid'

import { Categories } from '../models/Categories'
import { BlogAccess } from '../dataLayer/posts'
import { CreateBlogPostRequest } from '../requests/CreateBlogCategoryRequest'
import { getUserId } from '../auth/utils'

const postsAccess = new BlogAccess()

export async function getAllPosts(): Promise<Categories[]> {
  return postsAccess.getAllPosts()
}

export async function createPost(
  CreateBlogPostRequest: CreateBlogPostRequest,
  jwtToken: string
): Promise<Categories> {

  const itemId = uuid.v4()
  const userId = getUserId(jwtToken)

  return await postsAccess.createPost({
    id: itemId,
    userId: userId,
    title: CreateBlogPostRequest.title,
    content: CreateBlogPostRequest.content,
    timestamp: new Date().toISOString()
  })
}
