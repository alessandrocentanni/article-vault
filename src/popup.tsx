import "~style.css"

import SearchTab from "~components/SearchTab"
import StoreTab from "~components/StoreTab"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~components/ui/tabs"

function NavigationTabs() {
  return (
    <Tabs defaultValue="store" className="">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="store">Store</TabsTrigger>
        <TabsTrigger value="search">Search</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="store">
        <StoreTab />
      </TabsContent>
      <TabsContent value="search">
        <SearchTab />
      </TabsContent>
      <TabsContent value="settings">
        <div>Settings</div>
      </TabsContent>
    </Tabs>
  )
}

function IndexPopup() {
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
