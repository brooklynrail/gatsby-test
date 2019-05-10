import React from "react"
import { renderToString } from "react-dom/server"
import Imgix from "react-imgix"

import { graphqlLongIdToShort } from "./helpers"

const imgUrl = img => {
  const id = graphqlLongIdToShort(img.id)
  return `https://brooklynrail-web.imgix.net/article_image/image/${id}/${
    img.image
  }`
}

const elForShortcode = (images, name) => {
  const img = images.find(i => i.name === name)
  if (!img) {
    console.error(`${name} not found.`)
    return null
  }
  const url = imgUrl(img)
  return <Imgix src={url} alt={img.caption} />
}

export const replaceShortcodes = (images, body) =>
  body.replace(/!!(\w+)!!/g, (match, shortcode) => {
    const el = elForShortcode(images, shortcode)
    return renderToString(el)
  })
