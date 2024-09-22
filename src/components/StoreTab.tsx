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
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const startScraping = async () => {
    try {
      setLoading(true)
      setErrorMessage("")

      const csResponse = await sendToContentScript({
        name: "get-webdata"
      })
      if (!csResponse) throw new Error("Failed to scrape data")

      const bgResponse = await sendToBackground({
        name: "webdata/store",
        body: JSON.parse(csResponse)
      })
      if (!bgResponse.success) throw new Error(bgResponse.error)
    } catch (error) {
      setErrorMessage(error?.message ?? "An error occurred")
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
      {errorMessage && <p className="text-red-300">{errorMessage}</p>}
    </Card>
  )
}

export default StoreTab
