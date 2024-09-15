import "~style.css"

import { ReloadIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"

import { sendToBackground } from "@plasmohq/messaging"

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
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const searchResults = async () => {
    console.log("searchResults")
    try {
      setLoading(true)
      const bgResponse = await sendToBackground({
        name: "search",
        body: { query: searchQuery }
      })
      setResults(bgResponse.data.hits)
    } catch (error) {
      // TODO: better error handling
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => searchResults(), 500)
    return () => clearTimeout(timeoutId)
  }, [searchQuery, 500])

  const onSearchQueryChange = (event) => {
    console.log("onSearchQueryChange", event.target.value)
    setSearchQuery(event.target.value)
  }

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
          <Input
            type="search"
            value={searchQuery}
            onChange={onSearchQueryChange}
          />
          {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
        </div>
      </CardContent>
      <CardFooter className="flex-col">
        {results.map((result) => (
          <div key={result.id} className="block pt-1 pb-1">
            <h2>
              <a href={result.document.url} target="_blank" rel="noreferrer">
                {result.document.title}
              </a>
            </h2>
            <small>
              {"Written by: " +
                result.document.author +
                " - added on: " +
                new Date(result.document.created_at).toLocaleDateString(
                  "en-US"
                )}
            </small>
          </div>
        ))}
        {results.length === 0 && (
          <div className="block pt-1 pb-1">No results found</div>
        )}
      </CardFooter>
    </Card>
  )
}

export default SearchTab
