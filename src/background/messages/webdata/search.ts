import { OramaClient } from "@oramacloud/client"

import type { PlasmoMessaging } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"

const storage = new Storage()

export type RequestBody = {
  query: string
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
    const oramaEndpoint = await storage.get("oramaEndpoint")
    const oramaPublicKey = await storage.get("oramaPublicKey")

    if (!oramaEndpoint || !oramaPublicKey) {
      throw new Error("You did not set up the Orama credentials")
    }

    const client = new OramaClient({
      endpoint: oramaEndpoint,
      api_key: oramaPublicKey
    })

    const results = await client.search({
      term: req.body.query,
      limit: 5,
      mode: "hybrid" // can be 'fulltext', 'vector' or 'hybrid'
    })

    res.send({ success: true, data: results })
  } catch (error) {
    res.send({ success: false, error: error.message })
  }
}

export default handler
