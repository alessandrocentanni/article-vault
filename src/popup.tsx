import { useState } from "react"

import "~style.css"

import { Button } from "~components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~components/ui/card"
import { Input } from "~components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~components/ui/tabs"

export function ButtonDemo() {
  return <Button>Button</Button>
}

export function NavigationTabs() {
  return (
    <Tabs defaultValue="store" className="">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="store">Store</TabsTrigger>
        <TabsTrigger value="search">Search</TabsTrigger>
      </TabsList>
      <TabsContent value="store">
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
            <Button className="w-full">Store</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="search">
        <Card>
          <CardHeader>
            <CardTitle>Search</CardTitle>
            <CardDescription>
              Search for the articles you've saved in the past!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Input id="current" type="search" />
            </div>
            {/* <div className="space-y-1">
              <Input id="new" type="password" />
            </div> */}
          </CardContent>
          <CardFooter>
            <Button>Search!</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

function IndexPopup() {
  const [data, setData] = useState("")

  return (
    <Card className="flex flex-col  dark rounded-none">
      <CardHeader>
        <CardTitle>WebClipper</CardTitle>
        <CardDescription>
          Your personal favourite content search engine
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <NavigationTabs />
      </CardContent>
      <CardFooter>i'll add links here maybe</CardFooter>
    </Card>
  )
}

export default IndexPopup
