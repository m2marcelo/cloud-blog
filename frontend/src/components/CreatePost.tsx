import * as React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { createBlogPost, uploadFile } from '../api/blog-posts-api'
import Auth from '../auth/Auth'

enum UploadState {
  NoUpload,
  UploadingData,
  UploadingFile,
}

interface CreateBlogPostProps {
  match: {
    params: {
      category: string
    }
  }
  auth: Auth
}

interface CreateBlogPostState {
  title: string
  file: any
  description: string
  uploadState: UploadState
}

export class CreatePost extends React.PureComponent<
  CreateBlogPostProps,
  CreateBlogPostState
> {
  state: CreateBlogPostState = {
    title: '',
    file: undefined,
    description: '',
    uploadState: UploadState.NoUpload
  }

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: event.target.value })
  }

  handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    console.log('File change', files)
    this.setState({
      file: files[0]
    })
  }

  handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ description: event.target.value })
  }

  handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    try {
      if (!this.state.file) {
        alert('File should be selected')
        return
      }

      this.setUploadState(UploadState.UploadingData)
      const uploadInfo = await createBlogPost(this.props.auth.getIdToken(), {
        category: this.props.match.params.category,
        title: this.state.title,
        description: this.state.description
      })

      console.log('Created post', uploadInfo)

      this.setUploadState(UploadState.UploadingFile)
      await uploadFile(uploadInfo.uploadUrl, this.state.file)

      alert('Post was uploaded!')
    } catch (e) {
      alert('Could not upload the post: ' + e.message)
    } finally {
      this.setUploadState(UploadState.NoUpload)
    }
  }

  setUploadState(uploadState: UploadState) {
    this.setState({
      uploadState
    })
  }

  render() {
    return (
      <div>
        <h1>Upload new image</h1>

        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Title</label>
            <input
              placeholder="Image title"
              value={this.state.title}
              onChange={this.handleTitleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Image</label>
            <input
              type="file"
              accept="image/*"
              placeholder="Image to upload"
              onChange={this.handleFileChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input
              placeholder="Write what happened"
              value={this.state.description}
              onChange={this.handleDescriptionChange}
            />
          </Form.Field>

          {this.renderButton()}
        </Form>
      </div>
    )
  }

  renderButton() {

    return (
      <div>
        {this.state.uploadState === UploadState.UploadingData && <p>Uploading image metadata</p>}
        {this.state.uploadState === UploadState.UploadingFile && <p>Uploading file</p>}
        <Button
          loading={this.state.uploadState !== UploadState.NoUpload}
          type="submit"
        >
          Upload
        </Button>
      </div>
    )
  }
}
