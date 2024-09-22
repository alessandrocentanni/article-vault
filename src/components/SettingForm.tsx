import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Storage } from "@plasmohq/storage"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "~components/ui/form"
import { Input } from "~components/ui/input"
import debounce from "~lib/debounce"

const storage = new Storage()

const formSchema = z.object({
  secretKey: z.string().trim(),
  publicKey: z.string().trim(),
  indexId: z.string().trim(),
  endpoint: z.string().trim()
})

function SettingForm() {
  const [errorMessage, setErrorMessage] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      secretKey: "",
      publicKey: "",
      indexId: "",
      endpoint: ""
    }
  })

  const getDefaultValues = async () => {
    try {
      const oramaIndexId = await storage.get("oramaIndexId")
      const oramaPublicKey = await storage.get("oramaPublicKey")
      const oramaSecretKey = await storage.get("oramaSecretKey")
      const oramaEndpoint = await storage.get("oramaEndpoint")
      return {
        secretKey: oramaSecretKey,
        publicKey: oramaPublicKey,
        indexId: oramaIndexId,
        endpoint: oramaEndpoint
      }
    } catch (error) {
      return {
        secretKey: "",
        publicKey: "",
        indexId: "",
        endpoint: ""
      }
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setErrorMessage("")

      await storage.set("oramaIndexId", values.indexId)
      await storage.set("oramaPublicKey", values.publicKey)
      await storage.set("oramaSecretKey", values.secretKey)
      await storage.set("oramaEndpoint", values.endpoint)

      // TODO: validate against an api call to orama
    } catch (error) {
      setErrorMessage(error?.message ?? "An error occurred")
    }
  }

  const debouncedOnSubmit = useCallback(debounce(onSubmit, 300), [])

  // biome-ignore lint/correctness/useExhaustiveDependencies: not needed, we only want to run this once to initialize the form
  useEffect(() => {
    getDefaultValues().then((defaultValues) => {
      form.reset(defaultValues)
    })
  }, [])

  return (
    <Form {...form}>
      <form
        onChange={form.handleSubmit(debouncedOnSubmit)}
        className="space-y-8">
        <FormField
          control={form.control}
          name="secretKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Secret Key</FormLabel>
              <FormControl>
                <Input type="password" placeholder="xxxxxxxxx" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="publicKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Public Key</FormLabel>
              <FormControl>
                <Input placeholder="xxxxxxxxx" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="indexId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Index ID</FormLabel>
              <FormControl>
                <Input placeholder="xxxxxxxxx" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endpoint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endpoint</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://cloud.orama.run/v1/indexes/whatever"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </form>

      {errorMessage && <p className="text-red-300">{errorMessage}</p>}
    </Form>
  )
}

export default SettingForm
