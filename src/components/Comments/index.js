import {Component} from 'react'

import {v4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here

class Comments extends Component {
  state = {
    nameInput: '',
    commentInput: '',
    commentsLists: [],
  }

  deleteComment = commentId => {
    const {commentsLists} = this.state

    this.setState({
      commentsLists: commentsLists.filter(comment => comment.id !== commentId),
    })
  }

  toggleIsLiked = id => {
    this.setState(prevState => ({
      commentsLists: prevState.commentsLists.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  renderCommentsLists = () => {
    const {commentsLists} = this.state

    return commentsLists.map(eachComment => (
      <CommentItem
        key={eachComment.id}
        commentDetails={eachComment}
        toggleIsLiked={this.toggleIsLiked}
        deleteComment={this.deleteComment}
      />
    ))
  }

  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newComment = {
      id: v4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentsLists: [...prevState.commentsLists, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  onChangeCommentInput = event => {
    this.setState({
      commentInput: event.target.value,
    })
  }

  onChangeNameInput = event => {
    this.setState({
      nameInput: event.target.value,
    })
  }

  render() {
    const {nameInput, commentInput, commentsLists} = this.state

    return (
      <div>
        <div>
          <h1>Comments</h1>
          <div>
            <form onSubmit={this.onAddComment}>
              <p>say something about 4.0 Technologies</p>
              <input
                type="text"
                placeholder="Your Name"
                value={nameInput}
                onChange={this.onChangeNameInput}
              />
              <textarea
                placeholder="Your Comment"
                value={commentInput}
                onChange={this.onChangeCommentInput}
                rows="6"
              />
              <button type="submit">Add Comment</button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
            />
          </div>
          <hr />
          <p>
            <span>{commentsLists.length}</span>
            Comments
          </p>
          <ul>{this.renderCommentsLists()}</ul>
        </div>
      </div>
    )
  }
}

export default Comments
