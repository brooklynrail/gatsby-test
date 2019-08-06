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

// Replaces out the shortcodes in the body
const filterShortcodes = (images, body) => {

  // New Images — [img name="img2" type="xl" /]
  var body_text = body.replace(/\[img name="(\w+)" type="(\w+)" \/\]/g, (match, shortcode) => {
    const el = elForShortcode(images, shortcode)
    return renderToString(el)
  })

  // Old images — !!img1!!
  var body_text = body_text.replace(/!!(\w+)!!/g, (match, shortcode) => {
    const el = elForShortcode(images, shortcode)
    return renderToString(el)
  })
  return body_text

}

export const replaceShortcodes = (images, body) =>
  filterShortcodes(images, body)
