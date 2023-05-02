import { observer } from "mobx-react-lite"
import { usePressure } from "@elninotech/mfd-modules"
import ValueOverview from "../../ui/ValueOverview"
import PressureIcon from "../../../images/icons/pressure.svg"
import ValueBox from "../../ui/ValueBox"
import { translate } from "react-i18nify"
import { useContext, useEffect } from "react"
import { VisibleComponentsContext } from "./EnvironmentOverview"

interface Props {
  dataId: number
  mode?: "compact" | "full"
  boxSize: { width: number; height: number }
}

const PressureData = ({ dataId, mode, boxSize }: Props) => {
  const { pressure, customName } = usePressure(dataId)

  const { passVisibility } = useContext(VisibleComponentsContext)

  useEffect(() => {
    if (pressure !== undefined && customName !== undefined) {
      passVisibility(dataId, true)
    } else {
      passVisibility(dataId, false)
    }
  }, [pressure, customName, dataId, passVisibility])

  if (mode === "compact") {
    return (
      <ValueOverview
        /* @ts-ignore */
        Icon={PressureIcon}
        title={customName}
        value={pressure}
        boxSize={boxSize}
        unit={"hPa"}
        valueType={"environment"}
      />
    )
  }

  return (
    <ValueBox
      title={translate("boxes.pressure") + " " + customName}
      /* todo: fix types for svg */
      /* @ts-ignore */
      icon={<PressureIcon className={"w-5"} />}
      value={pressure}
      bottomValues={[]}
      unit={"hPa"}
    />
  )
}

export default observer(PressureData)
