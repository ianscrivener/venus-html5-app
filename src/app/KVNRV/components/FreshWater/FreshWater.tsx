import React from "react"

import { Card, SIZE_BIG, SIZE_LONG } from "../../../components/Card"
import { useWater } from "../../../modules"
import { NotAvailable } from "../NotAvailable"
import NumericValue from "../../../components/NumericValue"
import WaterTankTop from "../../images/WaterTankTop.svg"

import { Footer } from "../../../components/Card/Card"
import { STATUS_LEVELS, STATUS_LEVELS_MSG } from "../Views/Metrics"
import "./FreshWater.scss"

export const FreshWater = () => {
  const { fresh_water } = useWater()

  const footer: Footer = {
    status: STATUS_LEVELS.WARNING,
    property: "Status",
    message: STATUS_LEVELS_MSG[STATUS_LEVELS.WARNING],
  }

  return (
    <div className="">
      <Card title={"Fresh Water"} size={[SIZE_BIG, SIZE_LONG]} footer={footer}>
        {fresh_water ? (
          <div className="fresh_water">
            <div className="indicator-main">
              <span>
                <NumericValue value={fresh_water.level * 100} unit="%" defaultValue={"--"} precision={0} />
                <span className="name">{fresh_water.size + " gal."}</span>
              </span>
            </div>

            <div className="wrapper">
              <div className={"water-tank"}>
                <div className="water-tank__outline">
                  <div className={"water-tank__water"}>
                    <img src={WaterTankTop} className="water-tank__water__top" alt={"Water wave top"} />
                    <div
                      className={"water-tank__water__body"}
                      style={{ height: (fresh_water?.level ?? 0) * 100 + "%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <NotAvailable />
        )}
      </Card>
    </div>
  )
}

export default FreshWater
