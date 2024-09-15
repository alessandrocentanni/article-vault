import { useState } from "react"

import { addWebdata, resetWebdata, setLoading } from "~slices/webdata-slice"
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
  // const [loading, setLoading] = useState(false)

  const dispatch = useAppDispatch()

  // Make sure to use "useAppSelector" instead of "useSelector" to automatically get the correct types
  const loading = useAppSelector((state) => state.webdata.loading)

  const startScraping = async () => {
    dispatch(setLoading(true))
    try {
      const csResponse = await sendToContentScript({
        name: "start-scraping",
        body: {}
      })
      console.log(csResponse)
    } catch (error) {
      console.log(error)
    }
    // wait 6s
    setTimeout(() => dispatch(setLoading(false)), 5000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Store</CardTitle>
        <CardDescription>
          Click the button below to add this page to your vault!
        </CardDescription>
      </CardHeader>
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
    </Card>
  )
}

export default StoreTab
