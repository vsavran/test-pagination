import styled from 'styled-components'
import { margin } from '@styled-system/space'

export const Container = styled.div`
  display: flex;
  flex: 1;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  justify-content: space-between;
`

export const Column = styled.div`
  width: 30%;
  min-height: 100vh;
  padding: 16px;
`

export const PostContainer = styled.div`
  width: 300px;
  border: 1px solid lightgray;
  border-radius: 8px;
  background: lightgray;
  padding: 16px;

  h3 {
    margin: 0;
  }

  ${margin}
`

export const PostAuthor = styled.small`
  display: block;
  color: gray;
`

export const PostBody = styled.div`
  ${margin}
`

export const PostComment = styled.div`
  background: #eeeeee;
  border-radius: 8px;
  padding: 16px;

  ${margin}
`

export const Back = styled.div`
  color: blue;
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`
