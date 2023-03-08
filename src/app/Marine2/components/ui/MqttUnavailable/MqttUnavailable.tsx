import React, { useEffect, useState } from "react"
import { translate } from "react-i18nify"
import MqttSettingsGuide from "../../../images/mqtt-settings-v2.42.png"
import Button from "../Button"
import { AppViews, useAppViewsStore } from "../../../modules/AppViews"
import { useMqtt } from "@elninotech/mfd-modules"
import Connecting from "../Connecting"

const MqttUnavailable = () => {
  const appViewsStore = useAppViewsStore()
  const mqtt = useMqtt()
  const { isConnected, error } = mqtt

  const [isConnecting, setIsConnecting] = useState(true)

  const openRemoteConsole = () => {
    appViewsStore.setView(AppViews.REMOTE_CONSOLE)
  }

  const restart = () => {
    window.location.reload()
  }

  useEffect(() => {
    if (!error) {
      clearTimeout(connectTimeout)
      appViewsStore.setView(AppViews.ROOT)
    }
  }, [error, isConnected])

  let connectTimeout: NodeJS.Timeout
  useEffect(() => {
    connectTimeout = setTimeout(() => {
      clearTimeout(connectTimeout)
      setIsConnecting(false)
    }, 6 * 1000)
  }, [])

  if (isConnecting) {
    return <Connecting />
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-victron-lightGray dark:bg-victron-darkGray border-4 border-victron-blue rounded-md text-sm text-black dark:text-victron-blue">
      <div className="block max-w-xl p-4">
        <div className="flex flex-row">
          <Button onClick={openRemoteConsole} className="w-full mb-4 mr-2" size="md">
            {translate("header.remoteConsole")}
          </Button>
          <Button onClick={restart} className="w-full mb-4 ml-2" size="md">
            {translate("error.marine.restartApp")}
          </Button>
        </div>
        <div>
          <div className={"text-md mb-4"}>{translate("error.mqttUnavailable1")}</div>
          <div className={"mt-2"}>{translate("error.mqttUnavailable2")}</div>
          <div className={"mt-2 italic"}>{translate("error.mqttUnavailable3")}</div>
          <div className={"mt-2"}>{translate("error.mqttUnavailable4")}</div>
          <div className={"mt-4 text-center"}>
            <img src={MqttSettingsGuide} alt={"MQTT Settings Guide"} className={"m-auto"} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MqttUnavailable
