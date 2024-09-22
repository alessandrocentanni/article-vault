import type { PlasmoCSConfig } from "plasmo"

import { useMessage } from "@plasmohq/messaging/hook"

export const config: PlasmoCSConfig = {
  all_frames: true
}

const QueryPageData = () => {
  useMessage<string, string>(async (req, res) => {
    if (req.name !== "get-webdata") return
    if (window.self !== window.top) return
    try {
      const url = `${location.protocol}//${location.host}${location.pathname}`

      // Get the page title
      const titleElement = document.querySelector("title")
      const title = titleElement ? titleElement.innerText : ""

      // Get the meta description
      const descriptionElement = document.querySelector(
        'meta[name="description"]'
      )
      const description = descriptionElement
        ? descriptionElement.getAttribute("content")
        : ""

      // Get the meta author
      const authorElement = document.querySelector('meta[name="author"]')
      const author = authorElement ? authorElement.getAttribute("content") : ""

      const content = document
        .querySelector("body")
        .innerText.replace(/(<([^>]+)>)/gi, "")
        .replace(/\s\s+/g, " ")
        .replace("\n", " ")
        .trim()

      res.send(JSON.stringify({ content, title, description, author, url }))
    } catch (error) {
      res.send("")
    }
  })
}

export default QueryPageData
