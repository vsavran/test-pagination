import React, {useEffect, useState} from 'react'
import {useHistory, useRouteMatch} from 'react-router'
import {sortableContainer, sortableElement} from 'react-sortable-hoc'

import {useQuery} from '@apollo/client'
import arrayMove from 'array-move'

import postQuery from 'GraphQL/Queries/post.graphql'

import {ROOT} from 'Router/routes'

import {
  Back,
  Column,
  Container,
  PostAuthor,
  PostBody,
  PostComment,
  PostContainer,
} from './styles'

const SortableContainer = sortableContainer(({children}) => <div>{children}</div>)

const SortableItem = sortableElement(({value}) => (
  <PostComment mb={2}>{value}</PostComment>
))

function Post() {
  const [comments, setComments] = useState([])
  const history = useHistory()
  const {
    params: {postId},
  } = useRouteMatch()

  const handleClick = () => history.push(ROOT)

  const handleChangePost = (direction) => () => {
    const data = {...getLocalData()}
    const options = {
      ['prev']: getLocalData().current - 1,
      ['next']: getLocalData().current + 1,
    }
    data.current = options[direction]
    localStorage.setItem('pagesData', JSON.stringify(data))
    history.push(`${data.current}`)
  }

  const handleSortEnd = ({oldIndex, newIndex}) => {
    console.log('started')
    setComments(arrayMove(comments, newIndex, oldIndex))
  }
  const getLocalData = () => JSON.parse(localStorage.getItem('pagesData'))


  const {data, loading} = useQuery(postQuery, {variables: {id: postId}})
  const post = data?.post || {}

  useEffect(() => {
    post.comments?.data && setComments(post.comments?.data)
  }, [post])
  return (
    <Container>
      <Column>
        <Back onClick={handleClick}>Back</Back>
      </Column>
      {loading ? (
        'Loading...'
      ) : (
        <>
          <Column>
            <h4>Need to add next/previous links</h4>
            <PostContainer key={post.id}>
              <h3>{post.title}</h3>
              <PostAuthor>by {post.user.name}</PostAuthor>
              <PostBody mt={2}>{post.body}</PostBody>
            </PostContainer>
            <div>
              <button disabled={getLocalData().current === 1} type='button' onClick={handleChangePost('prev')}>Prev
              </button>
              <button disabled={getLocalData().current === getLocalData().total} type='button'
                      onClick={handleChangePost('next')}>Next
              </button>
            </div>
          </Column>

          <Column>
            <h4>Incorrect sorting</h4>
            Comments:
            <SortableContainer onSortEnd={handleSortEnd}>
              {comments.map((comment, index) => (
                <SortableItem
                  index={index}
                  key={comment.id}
                  mb={3}
                  value={comment.body}
                />
              ))}
            </SortableContainer>
          </Column>
        </>
      )}
    </Container>
  )
}

export default Post
