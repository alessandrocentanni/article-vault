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
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value)
  }

  useEffect(() => {
    const timeoutId = setTimeout(
      () => setDebouncedSearchQuery(searchQuery),
      500
    )
    return () => clearTimeout(timeoutId)
  }, [searchQuery, 500])

  useEffect(() => {
    const fetchdata = async () => {
      await searchResults()
    }

    fetchdata().catch((error) => {
      // TODO: better error handling
    })
  }, [debouncedSearchQuery])

  const searchResults = async () => {
    setLoading(true)
    try {
      // send data to background
      const bgResponse = await sendToBackground({
        name: "search",
        body: { query: searchQuery }
      })
      setResults(bgResponse.data.hits)
    } catch (error) {
      // TODO: better error handling
    }
    setLoading(false)
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
            id="current"
            type="search"
            value={searchQuery}
            onChange={handleInputChange}
          />
          {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
        </div>
        {/* <div className="space-y-1">
              <Input id="new" type="password" />
            </div> */}
      </CardContent>
      <CardFooter className="flex-col">
        {results.map((result) => (
          // display title with url (link), and author if present
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
