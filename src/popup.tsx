import "~style.css";

import SearchTab from "~components/SearchTab";
import SettingTab from "~components/SettingTab";
import StoreTab from "~components/StoreTab";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~components/ui/tabs";

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
        <SettingTab />
      </TabsContent>
    </Tabs>
  );
}

function IndexPopup() {
  return (
    <Card className="flex flex-col  dark rounded-none">
      <CardHeader>
        <CardTitle>ArticleVault</CardTitle>
        <CardDescription>Your Personal Web Archive 🗃️🔍</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <NavigationTabs />
      </CardContent>
      <CardFooter>
        <p className="text-xs text-gray-400">
          Made with ❤️ by{" "}
          <a
            href="https://github.com/alessandrocentanni/article-vault"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Alessandro
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}

export default IndexPopup;
