import { CloudManager } from "@oramacloud/client"

import type { PlasmoMessaging } from "@plasmohq/messaging"

const manager = new CloudManager({
  api_key: process.env.PLASMO_PUBLIC_ORAMA_SECRET_KEY
})

export type RequestBody = {
  description: string
  title: string
  url: string
  content: string
  author: string
}

export type RequestResponse = any

const handler: PlasmoMessaging.MessageHandler<
  RequestBody,
  RequestResponse
> = async (req, res) => {
  try {
    const { title, description, url, content, author } = req.body

    if (!title || !description || !url || !content || !author) {
      throw new Error("Missing required fields")
    }

    const indexManager = manager.index("t6juz5493s291ru3v96tief3")

    // Insert documents
    await indexManager.insert([
      {
        title,
        description,
        url,
        content,
        author,
        created_at: new Date().toISOString(),
        user_id: "1"
      }
    ])

    await indexManager.deploy()

    res.send({ success: true })
  } catch (error) {
    res.send({ success: false, error })
  }
}

export default handler
