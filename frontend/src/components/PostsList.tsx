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
      groupId: string
    }
  }
}

interface PostsListState {
  images: BlogPostModel[]
}

export class PostsList extends React.PureComponent<
PostsListProps,
PostsListState
> {
  state: PostsListState = {
    images: []
  }

  handleCreatePost = () => {
    this.props.history.push(`/images/${this.props.match.params.groupId}/create`)
  }

  async componentDidMount() {
    try {
      const images = await getBlogPosts(this.props.match.params.groupId)
      this.setState({
        images
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
          {this.state.images.map(image => {
            return <PostImage key={image.imageId} image={image} />
          })}
        </Card.Group>
      </div>
    )
  }
}
