import * as React from 'react'
import { Card } from 'semantic-ui-react'
import { BlogCategoriesModel } from '../types/BlogCategoriesModel'
import { Link } from 'react-router-dom'

interface CategoryCardProps {
  category: BlogCategoriesModel
}

interface CategoryCardState {
}

export class Category extends React.PureComponent<CategoryCardProps, CategoryCardState> {

  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header>
            <Link to={`/posts/${this.props.category.id}`}>{this.props.category.title}</Link>
          </Card.Header>
          <Card.Description>{this.props.category.content}</Card.Description>
        </Card.Content>
      </Card>
    )
  }
}
