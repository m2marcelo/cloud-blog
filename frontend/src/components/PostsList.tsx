import * as React from 'react'
import { BlogPostModel } from '../types/BlogPostModel'
import { getBlogPosts } from '../api/blog-posts-api'
import { Card, Divider, Button } from 'semantic-ui-react'
import { PostImage } from './PostImage'
import { History } from 'history'

interface PostsListProps {
  history: History
  match: {
    params: {
      category: string
    }
  }
}

interface PostsListState {
  posts: BlogPostModel[]
}

export class PostsList extends React.PureComponent<
PostsListProps,
PostsListState
> {
  state: PostsListState = {
    posts: []
  }

  handleCreatePost = () => {
    this.props.history.push(`/posts/${this.props.match.params.category}/create`)
  }

  async componentDidMount() {
    try {
      const posts = await getBlogPosts(this.props.match.params.category)
      this.setState({
        posts
      })
    } catch (e) {
      alert(`Failed to fetch posts for a category : ${e.message}`)
    }
  }

  render() {

    return (
      <div>
        <h1>Posts</h1>

        <Button
          primary
          size="huge"
          className="add-button"
          onClick={this.handleCreatePost}
        >
          Upload new image
        </Button>

        <Divider clearing />

        <Card.Group>
          {this.state.posts.map(posts => {
            return <PostImage key={posts.imageId} image={posts} />
          })}
        </Card.Group>
      </div>
    )
  }
}
