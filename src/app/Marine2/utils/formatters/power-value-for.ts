import { formatValue } from "../formatters"
import { isKilowattFor } from "../helpers/is-kilowatt-for"
import { TForcePowerUnit } from "@m2Types/generic/force-power-unit"

export const powerValueFor = (value?: number, forcePowerUnit?: TForcePowerUnit): string => {
  if (!value) {
    return formatValue(0)
  }

  if (forcePowerUnit) {
    return forcePowerUnit === "W" ? formatValue(value, 0) : formatValue(value / 1000)
  }

  if (!isKilowattFor(value)) {
    return formatValue(value, 0)
  }

  return formatValue(value / 1000)
}
