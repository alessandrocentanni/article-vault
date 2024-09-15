import { OramaClient } from "@oramacloud/client"

import type { PlasmoMessaging } from "@plasmohq/messaging"

const client = new OramaClient({
  endpoint: process.env.PLASMO_PUBLIC_ORAMA_ENDPOINT,
  api_key: process.env.PLASMO_PUBLIC_ORAMA_PUBLIC_KEY
})

export type RequestBody = {
  query: string
}

export type RequestResponse = any

const handler: PlasmoMessaging.MessageHandler<
  RequestBody,
  RequestResponse
> = async (req, res) => {
  try {
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
