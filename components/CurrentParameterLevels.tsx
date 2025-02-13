import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const CurrentParameterLevels = ({ selectedPoint, config }) => {
  // Placeholder for real data
  const parameterValue = selectedPoint ? (Math.random() * 100 + 300).toFixed(2) : "N/A"

  return (
    <Card className="w-80 bg-black/50 border-cyan-500 border">
      <CardHeader>
        <CardTitle>Current {config.parameter.charAt(0).toUpperCase() + config.parameter.slice(1)} Levels</CardTitle>
      </CardHeader>
      <CardContent>
        {selectedPoint ? (
          <p>
            Lat: {selectedPoint.y.toFixed(2)}, Lon: {selectedPoint.x.toFixed(2)}, Value: {parameterValue} ppm
          </p>
        ) : (
          <p>Click on the globe to see data</p>
        )}
      </CardContent>
    </Card>
  )
}

export default CurrentParameterLevels

