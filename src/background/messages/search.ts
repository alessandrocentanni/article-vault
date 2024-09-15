import { OramaClient } from "@oramacloud/client"

import type { PlasmoMessaging } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"

const storage = new Storage()

export type RequestBody = {
  query: string
}

export type RequestResponse = any

const handler: PlasmoMessaging.MessageHandler<
  RequestBody,
  RequestResponse
> = async (req, res) => {
  try {
    const client = new OramaClient({
      endpoint: await storage.get("oramaEndpoint"),
      api_key: await storage.get("oramaPublicKey")
    })
    const results = await client.search({
      term: req.body.query,
      limit: 5,
      mode: "fulltext" // can be 'fulltext', 'vector' or 'hybrid'
    })

    res.send({ success: true, data: results })
  } catch (error) {
    res.send({ success: false, error })
  }
}

export default handler
