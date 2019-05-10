import React from "react"
import { Link } from "gatsby"
import striptags from "striptags"

const ArticlePreview = props => {
  const permalink = `/${props.permalink}`
  const title = striptags(props.title)
  return (
    <li>
      <Link to={permalink} dangerouslySetInnerHTML={{ __html: title }} />
    </li>
  )
}

export default ArticlePreview
