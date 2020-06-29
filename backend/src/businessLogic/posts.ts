import * as uuid from 'uuid'

import { BlogPost } from '../models/Posts'
import { BlogAccess } from '../dataLayer/posts'
import { CreateBlogPostRequest } from '../requests/CreateBlogPostRequest'
import { getUserId } from '../auth/utils'

const postsAccess = new BlogAccess()

export async function getAllPosts(): Promise<BlogPost[]> {
  return postsAccess.getAllPosts()
}

export async function createPost(
  CreateBlogPostRequest: CreateBlogPostRequest,
  jwtToken: string
): Promise<BlogPost> {

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
