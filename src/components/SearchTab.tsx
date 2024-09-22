import "~style.css"

import { ReloadIcon } from "@radix-ui/react-icons"
import { useCallback, useEffect, useState } from "react"

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
import debounce from "~lib/debounce"

function SearchTab() {
  const [results, setResults] = useState([])
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const getSearchResults = async (query: string) => {
    try {
      setLoading(true)
      setErrorMessage("")

      const bgResponse = await sendToBackground({
        name: "webdata/search",
        body: { query }
      })
      if (!bgResponse.success) throw new Error(bgResponse.error)

      setResults(bgResponse.data.hits)
    } catch (error) {
      setErrorMessage(error?.message ?? "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const debouncedGetSearchResults = useCallback(
    debounce(getSearchResults, 300),
    []
  )

  const onSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value
    debouncedGetSearchResults(query)
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
          <Input type="search" onChange={onSearchQueryChange} />
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
              {`Written by: ${result.document.author} - added on: ${new Date(
                result.document.created_at
              ).toLocaleDateString("en-US")}`}
            </small>
          </div>
        ))}

        {results.length === 0 && (
          <div className="block pt-1 pb-1">No results found</div>
        )}

        {errorMessage && <p className="text-red-300">{errorMessage}</p>}
      </CardFooter>
    </Card>
  )
}

export default SearchTab
