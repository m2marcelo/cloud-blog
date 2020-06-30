import * as uuid from 'uuid'

import { Categories } from '../models/Categories'
import { BlogAccess } from '../dataLayer/posts'
import { CreateBlogCategoryRequest } from '../requests/CreateBlogCategoryRequest'
import { getUserId } from '../auth/utils'

const postsAccess = new BlogAccess()

export async function getAllPosts(): Promise<Categories[]> {
  return postsAccess.getAllPosts()
}

export async function createPost(
  CreateBlogCategoryRequest: CreateBlogCategoryRequest,
  jwtToken: string
): Promise<Categories> {

  const itemId = uuid.v4()
  const userId = getUserId(jwtToken)

  return await postsAccess.createPost({
    id: itemId,
    userId: userId,
    title: CreateBlogCategoryRequest.title,
    content: CreateBlogCategoryRequest.content,
    timestamp: new Date().toISOString()
  })
}
