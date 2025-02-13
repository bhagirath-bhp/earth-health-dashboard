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
    rotationSpeed: 0.001,
    particleSize: 0.01,
    glowIntensity: 1,
  })

  return (
    <div className="relative w-full h-screen bg-background overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 to-transparent opacity-20 z-0"></div>
      <Globe onSelectPoint={setSelectedPoint} config={config} />
      <div className="absolute top-4 left-4 z-10">
        <CurrentParameterLevels selectedPoint={selectedPoint} config={config} />
      </div>
      <div className="absolute top-4 right-4 z-10">
        <HistoricalData selectedPoint={selectedPoint} config={config} />
      </div>
      <div className="absolute bottom-4 left-4 z-10">
        <ConfigurationMenu config={config} setConfig={setConfig} />
      </div>
      <div className="absolute bottom-4 right-4 z-10">
        <AdditionalAnalytics selectedPoint={selectedPoint} config={config} />
      </div>
      <h1 className="absolute top-2 left-1/2 transform -translate-x-1/2 text-4xl font-bold text-gradient z-20">
        Earth Health Dashboard
      </h1>
    </div>
  )
}

