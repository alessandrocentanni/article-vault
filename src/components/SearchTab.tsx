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

function SearchTab() {
  return (
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
  )
}

export default SearchTab
