import "~style.css"

import { ReloadIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"

import { Storage } from "@plasmohq/storage"

import SettingForm from "~components/SettingForm"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "~components/ui/card"

const storage = new Storage()

function SettingTab() {
  const [validSettings, setValidSettings] = useState(false)
  const [loading, setLoading] = useState(true)

  const validateSettings = async () => {
    try {
      setLoading(true)

      const oramaIndexId = await storage.get("oramaIndexId")
      const oramaPublicKey = await storage.get("oramaPublicKey")
      const oramaSecretKey = await storage.get("oramaSecretKey")
      const oramaEndpoint = await storage.get("oramaEndpoint")

      if (oramaIndexId && oramaPublicKey && oramaSecretKey && oramaEndpoint) {
        setValidSettings(true)
      }
    } catch (error) {
      // TODO: better error handling
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    validateSettings()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Options</CardTitle>
        <CardDescription>Setup your OramaSearch variables</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}

        <SettingForm onSettingsUpdate={validateSettings} />
      </CardContent>
      <CardFooter className="flex-col"></CardFooter>
    </Card>
  )
}

export default SettingTab
