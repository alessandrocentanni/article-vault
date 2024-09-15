import { useState } from "react"

import { setLoading } from "~slices/webdata-slice"
import { useAppDispatch, useAppSelector } from "~store"

import "~style.css"

import { sendToContentScript } from "@plasmohq/messaging"

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

  const dispatch = useAppDispatch()

  // Make sure to use "useAppSelector" instead of "useSelector" to automatically get the correct types
  const loading = useAppSelector((state) => state.webdata.loading)

  const startScraping = async () => {
    dispatch(setLoading(true))
    try {
      console.log("fetching data")
      const csResponse = await sendToContentScript({
        name: "query-selector-text",
        body: {}
      })
      console.log("csResponse", csResponse)
      if (!csResponse) throw new Error("Failed to scrape data")
      console.log("setting csresponse")
      const webData = JSON.parse(csResponse)
      setContent(csResponse)
    } catch (error) {
      console.log(error)
      // TODO: better error handling
    }
    console.log("can we set loading to false?")
    dispatch(setLoading(false))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Store</CardTitle>
        <CardDescription>
          Click the button below to add this page to your vault! {loading}
        </CardDescription>
      </CardHeader>
      {/* <Button onClick={() => dispatch(setLoading(false))}>
        reset loading state
      </Button> */}
      {/* <CardContent className="space-y-2">
            <div className="space-y-1">
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Input id="username" defaultValue="@peduarte" />
            </div>
          </CardContent> */}
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
