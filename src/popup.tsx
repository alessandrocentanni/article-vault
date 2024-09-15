import "~style.css"

import { Provider } from "react-redux"

import { PersistGate } from "@plasmohq/redux-persist/integration/react"

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
import { persistor, store } from "~store"

function NavigationTabs() {
  return (
    <Tabs defaultValue="store" className="">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="store">Store</TabsTrigger>
        <TabsTrigger value="search">Search</TabsTrigger>
      </TabsList>
      <TabsContent value="store">
        <StoreTab />
      </TabsContent>
      <TabsContent value="search">
        <SearchTab />
      </TabsContent>
    </Tabs>
  )
}

function IndexPopup() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
      </PersistGate>
    </Provider>
  )
}

export default IndexPopup
