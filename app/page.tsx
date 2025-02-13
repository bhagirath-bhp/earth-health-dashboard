"use client"

import { useState } from "react"
import Globe from "../components/Globe"
import CurrentParameterLevels from "../components/CurrentParameterLevels"
import HistoricalData from "../components/HistoricalData"
import ConfigurationMenu from "../components/ConfigurationMenu"
import AdditionalAnalytics from "../components/AdditionalAnalytics"

export default function Dashboard() {
  const [selectedPoint, setSelectedPoint] = useState(null)
  const [config, setConfig] = useState({
    parameter: "carbon",
    timeRange: "1y",
    region: "global",
  })

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <Globe onSelectPoint={setSelectedPoint} config={config} />
      <div className="absolute top-4 left-4">
        <CurrentParameterLevels selectedPoint={selectedPoint} config={config} />
      </div>
      <div className="absolute top-4 right-4">
        <HistoricalData selectedPoint={selectedPoint} config={config} />
      </div>
      <div className="absolute bottom-4 left-4">
        <ConfigurationMenu config={config} setConfig={setConfig} />
      </div>
      <div className="absolute bottom-4 right-4">
        <AdditionalAnalytics selectedPoint={selectedPoint} config={config} />
      </div>
    </div>
  )
}

