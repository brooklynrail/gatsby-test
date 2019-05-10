import React from "react"
import { Link } from "gatsby"
import striptags from "striptags"

const ArticlePreview = props => {
  const permalink = `/${props.permalink}`
  const title = striptags(props.title)
  return (
    <li>
      {/* even though the tags are stripped, we want HTML entities to render */}
      <Link to={permalink} dangerouslySetInnerHTML={{ __html: title }} />
    </li>
  )
}

export default ArticlePreview
