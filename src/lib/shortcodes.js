import React from "react"
import { renderToString } from "react-dom/server"
import Imgix from "react-imgix"

import { graphqlLongIdToShort } from "./helpers"

const imgHost = `https://brooklynrail-web.imgix.net`

const imgUrl = img => {
  const id = graphqlLongIdToShort(img.id)
  const path = `/article_image/image/${id}/${img.image}`
  return imgHost + path
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
