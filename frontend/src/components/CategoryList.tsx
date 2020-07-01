import * as React from 'react'
import { BlogCategoriesModel } from '../types/BlogCategoriesModel'
import { Category } from './Category'
import { getAllCategories } from '../api/blog-categories-api'
import { Card, Button, Divider } from 'semantic-ui-react'
import { History } from 'history'

import Background from '../assets/clouds.jpg';


interface CategoriesListProps {
  history: History
}

interface CategoriesListState {
  categories: BlogCategoriesModel[]
}

var sectionStyle = {
  backgroundSize: '100%',
  backgroundImage: `url(${Background})`,
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat'
};

export class CategoryList extends React.PureComponent<CategoriesListProps, CategoriesListState> {
  state: CategoriesListState = {
    categories: []
  }

  handleCreateCategory = () => {
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
      <div style={ sectionStyle }>
        <h1>Cloud Blog</h1>

        <Button
          primary
          size="huge"
          className="add-button"
          onClick={this.handleCreateCategory}
        >
          Create new category
        </Button>

        <Divider clearing />

        <h2>Existing blog categories</h2>
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
