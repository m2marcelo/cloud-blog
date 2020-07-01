import * as React from 'react'
import { BlogCategoriesModel } from '../types/BlogCategoriesModel'
import { Category } from './Category'
import { getAllCategories } from '../api/blog-categories-api'
import { Card, Button, Divider } from 'semantic-ui-react'
import { History } from 'history'

interface CategoriesListProps {
  history: History
}

interface CategoriesListState {
  categories: BlogCategoriesModel[]
}

export class CategoryList extends React.PureComponent<CategoriesListProps, CategoriesListState> {
  state: CategoriesListState = {
    categories: []
  }

  handleCreateGroup = () => {
    this.props.history.push(`/categories/create`)
  }

  async componentDidMount() {
    try {
      const categories = await getAllCategories()
      this.setState({
        categories
      })
    } catch (e) {
      alert(`Failed to fetch groups: ${e.message}`)
    }
  }

  render() {
    return (
      <div>
        <h1>Groups</h1>

        <Button
          primary
          size="huge"
          className="add-button"
          onClick={this.handleCreateGroup}
        >
          Create new category
        </Button>

        <Divider clearing />

        <Card.Group>
          {this.state.categories.map(category => {
            return <Category key={category.id} category={category} />
          })}
        </Card.Group>
      </div>
    )
  }
}
