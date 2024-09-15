import { useState } from "react"

import "~style.css"

import { sendToBackground, sendToContentScript } from "@plasmohq/messaging"

import { Button } from "~components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~components/ui/card"

function StoreTab() {
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  const startScraping = async () => {
    try {
      setLoading(true)

      const csResponse = await sendToContentScript({
        name: "query-selector-text",
        body: {}
      })
      if (!csResponse) throw new Error("Failed to scrape data")

      const webData = JSON.parse(csResponse)

      // send data to background
      const bgResponse = await sendToBackground({
        name: "store",
        body: webData
      })
      setContent(JSON.stringify(bgResponse))
    } catch (error) {
      // TODO: better error handling
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Store</CardTitle>
        <CardDescription>
          Click the button below to add this page to your vault! {loading}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button loading={loading} className="w-full" onClick={startScraping}>
          Store
        </Button>
      </CardFooter>
      {content}
    </Card>
  )
}

export default StoreTab
