import * as React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { thread, filterIf } from '../utils'
import Loading from './Loading'
import { Post } from './BlogPost'

export const BlogListQuery = gql`
query BlogList {
  BlogList {
    id
    title
    category
    url
    date
    tags
    excerpt
    words
    readTime
  }
}`

export default function BlogList({ category, tag }) {
  const { errors, data } = useQuery(BlogListQuery)

  if (errors) {
    console.error(errors)
    return 'something went wrong :('
  }

  if (! (data && data.BlogList)) {
    return <Loading />
  }

  return (
    <List
      data={data.BlogList}
      tag={tag}
      category={category}
    />
  )
}

export const List = ({ tag, category, data }) => (
  <div className="blogContainer">
    <h1>Blog posts</h1>
    {tag && <b>{`Tagged: ${tag}`}</b>}
    {category && <b>{`Category: ${category}`}</b>}
    {thread([
      filterIf(category, e => e.category === category),
      filterIf(tag, e => e.tags.includes(tag)),
      x => x.slice(0).sort((a, b) => b.date - a.date),
      x => x.map(y => <Post key={y.id} data={y} />),
    ], data)}
  </div>
)
