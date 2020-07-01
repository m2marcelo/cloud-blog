import * as React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { createBlogCategory } from '../api/blog-categories-api'
import Auth from '../auth/Auth'

interface CreateCategoryProps {
  auth: Auth
}

interface CreateCategoryState {
  title: string
  content: string
  uploadingCategory: boolean
}

export class CreateCategory extends React.PureComponent<
  CreateCategoryProps,
  CreateCategoryState
> {
  state: CreateCategoryState = {
    title: '',
    content: '',
    uploadingCategory: false
  }

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: event.target.value })
  }

  handleContentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ content: event.target.value })
  }

  handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    try {
      if (!this.state.title || !this.state.content) {
        alert('Title and content are mandatory')
        return
      }

      this.setUploadState(true)
      const category = await createBlogCategory(this.props.auth.getIdToken(), {
        title: this.state.title,
        content: this.state.content
      })

      console.log('Created content', category)

      alert('Category was created!')
    } catch (e) {
      alert('Could not upload a category: ' + e.message)
    } finally {
      this.setUploadState(false)
    }
  }

  setUploadState(uploadingCategory: boolean) {
    this.setState({
      uploadingCategory
    })
  }

  render() {
    return (
      <div>
        <h1>Create and store new category</h1>

        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Title</label>
            <input
              placeholder="Title for the new category"
              value={this.state.title}
              onChange={this.handleTitleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input
              placeholder="Content for this category"
              value={this.state.content}
              onChange={this.handleContentChange}
            />
          </Form.Field>
          {this.renderButton()}
        </Form>
      </div>
    )
  }

  renderButton() {
    return (
      <Button loading={this.state.uploadingCategory} type="submit">
        Create
      </Button>
    )
  }
}
