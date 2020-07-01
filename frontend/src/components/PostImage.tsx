import * as React from 'react'
import { Card, Image } from 'semantic-ui-react'
import { BlogPostModel } from '../types/BlogPostModel'

interface PostImageCardProps {
  image: BlogPostModel
}

interface PostImageCardState {}

export class PostImage extends React.PureComponent<
PostImageCardProps,
PostImageCardState
> {

  render() {
    return (
      <Card fluid color="red">
        <Card.Content>
          <Card.Header>{this.props.image.title}</Card.Header>
          <Card.Description>{this.props.image.timestamp}</Card.Description>
          {this.props.image.imageUrl && (
            <Image src={this.props.image.imageUrl} />
          )}
        </Card.Content>
      </Card>
    )
  }
}
