import { CloudManager } from "@oramacloud/client"

import type { PlasmoMessaging } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"

const storage = new Storage()

export type RequestBody = {
  description: string
  title: string
  url: string
  content: string
  author: string
}

export type RequestResponse = {
  success: boolean
  // biome-ignore lint/suspicious/noExplicitAny: Orama does not export types :(
  data?: any
  // biome-ignore lint/suspicious/noExplicitAny: unknown
  error?: any
}

const handler: PlasmoMessaging.MessageHandler<
  RequestBody,
  RequestResponse
> = async (req, res) => {
  try {
    const { title, description, url, content, author } = req.body

    if (!title || !url || !content) {
      throw new Error("Missing required fields")
    }

    const oramaIndexId = await storage.get("oramaIndexId")
    const oramaSecretKey = await storage.get("oramaSecretKey")

    if (!oramaIndexId || !oramaSecretKey) {
      throw new Error("You did not set up the Orama credentials")
    }

    const manager = new CloudManager({ api_key: oramaSecretKey })
    const indexManager = manager.index(oramaIndexId)

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
    res.send({ success: false, error: error.message })
  }
}

export default handler
