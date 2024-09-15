import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
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

const storage = new Storage()

const debounce = (func, delay) => {
  let timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => func.apply(this, args), delay)
  }
}

const formSchema = z.object({
  secretKey: z.string().trim(),
  publicKey: z.string().trim(),
  indexId: z.string().trim(),
  endpoint: z.string().trim()
})

function SettingForm({ onSettingsUpdate }: { onSettingsUpdate: () => void }) {
  // ...
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

  const debouncedSubmit = debounce(onSubmit, 500)

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("setting values:", values)

    try {
      await storage.set("oramaIndexId", values.indexId)
      await storage.set("oramaPublicKey", values.publicKey)
      await storage.set("oramaSecretKey", values.secretKey)
      await storage.set("oramaEndpoint", values.endpoint)
      // this is a stupid hack because it will unmount the component
      onSettingsUpdate()
      // TODO: validate against an api call to orama
    } catch (error) {
      // TODO: better error handling
    }
  }

  useEffect(() => {
    getDefaultValues().then((defaultValues) => {
      form.reset(defaultValues)
    })
  }, [])

  return (
    <Form {...form}>
      <form onChange={form.handleSubmit(debouncedSubmit)} className="space-y-8">
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
    </Form>
  )
}

export default SettingForm
