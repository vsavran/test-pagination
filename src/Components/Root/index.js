import React, {useState, useRef, useEffect} from 'react'
import {NavLink} from 'react-router-dom'

import {useQuery} from '@apollo/client'
import faker from 'faker'
import {nanoid} from 'nanoid'

import postsQuery from 'GraphQL/Queries/posts.graphql'

import {POST} from 'Router/routes'

import {Column, Container, Post, PostAuthor, PostBody} from './styles'

import ExpensiveTree from '../ExpensiveTree'

const perPage = 7

function Root() {
  const [count, setCount] = useState(0)
  const countRef = useRef(count);
  const [fields, setFields] = useState([
    {
      name: faker.name.findName(),
      id: nanoid(),
    },
  ])
  const [value, setValue] = useState('')
  const [page, setPage] = useState(1)
  const {data, loading, refetch} = useQuery(postsQuery, {
    variables: {
      limit: perPage,
      page
    }
  })
  useEffect(()=>{
    const pagesData = JSON.parse(localStorage.getItem('pagesData'))
    if(pagesData){
      const itemFromPage = Math.ceil(pagesData.current/perPage)
      setPage(itemFromPage)
      refetch({
        limit: itemFromPage,
        page: itemFromPage
      })
      localStorage.removeItem('pagesData')
    }
  },[])

  function handlePush() {
    setFields(prev => [...prev, {name: faker.name.findName(), id: nanoid()}])
  }

  function handleAlertClick() {
    setTimeout(() => {
      alert(`You clicked ${countRef.current} times`)
    }, 2500)
  }

  const handleUpdateList = ({dir, pageRandom}) => () => {
    const direction = {
      ['next']: (stateData) => stateData + 1,
      ['prev']: (stateData) => stateData - 1
    }
    setPage(prev => {
      refetch({
        limit: perPage,
        page: pageRandom || direction[dir](prev)
      })
      return pageRandom || direction[dir](prev)
    })
  }

  const posts = data?.posts.data || []
  const pages = Math.ceil(data?.posts.meta.totalCount / perPage) || 0

  const handleCacheData = (id) => () => {
    const idx = posts.findIndex(post => post.id === id) + 1
    const currentItemsNumber = page * perPage - perPage + idx
    const pagesData = {
      total: data?.posts.meta.totalCount,
      current: currentItemsNumber
    }
    localStorage.setItem('pagesData', JSON.stringify(pagesData))
  }
  return (
    <Container>
      <Column>
        <h4>Need to add pagination</h4>
        {loading
          ? 'Loading...'
          : posts.map(post => (
            <Post key={Math.random()} mx={4}>
              <NavLink onClick={handleCacheData(post.id)} href={POST(post.id)} to={POST(post.id)}>
                {post.title}
              </NavLink>
              <PostAuthor>by {post.user.name}</PostAuthor>
              <PostBody>{post.body}</PostBody>
            </Post>
          ))}

        <div>
          {new Array(pages).fill('').map((pageNumb, idx) => <span
            style={{
              cursor: 'pointer',
              margin: '0 2px',
              color: page === idx + 1 ? 'green' : "black"
            }}
            aria-hidden
            onKeyDown={() => null}
            onClick={handleUpdateList({pageRandom: idx + 1})}
            key={Math.random()}>
            {(page - 1 === idx + 1 || page === idx + 1 || idx === page) && idx + 1}
          </span>)
          }
        </div>
        <button disabled={page === 1} type='button' onClick={handleUpdateList({dir: 'prev'})}>Prev</button>
        <button disabled={page === pages} type='button' onClick={handleUpdateList({dir: 'next'})}>Next</button>
      </Column>
      <Column>
        <h4>Slow rendering</h4>
        <label>
          Enter something here:
          <br/>
          <input
            value={value}
            onChange={({target}) => setValue(target.value)}
          />
        </label>
        <p>So slow...</p>
        <ExpensiveTree/>

        <h4>Closures</h4>
        <p>You clicked {count} times</p>
        <button type="button" onClick={() => {
          setCount(prev => {
            countRef.current = prev + 1
            return prev + 1
          })
        }}>
          Click me
        </button>
        <button type="button" onClick={handleAlertClick}>
          Show alert
        </button>
      </Column>

      <Column>
        <h4>Incorrect form field behavior</h4>
        <button type="button" onClick={handlePush}>
          Add more
        </button>
        <ol>
          {[...fields].reverse().map((field) => (
            <li key={field.id}>
              {field.name}:<br/>
              <input type="text"/>
            </li>
          ))}
        </ol>
      </Column>
    </Container>
  )
}

export default Root
