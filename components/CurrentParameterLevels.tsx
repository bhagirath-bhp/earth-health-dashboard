import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const CurrentParameterLevels = ({ selectedPoint, config }) => {
  const parameterValue = selectedPoint ? (Math.random() * 100 + 300).toFixed(2) : "N/A"

  return (
    <Card className="w-80 bg-card/80 backdrop-blur-md border-primary/20 shadow-lg card-gradient">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gradient">
          Current {config.parameter.charAt(0).toUpperCase() + config.parameter.slice(1)} Levels
        </CardTitle>
      </CardHeader>
      <CardContent>
        {selectedPoint ? (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Location</p>
            <p className="text-lg font-medium">
              Lat: {selectedPoint.y.toFixed(2)}, Lon: {selectedPoint.x.toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground">Value</p>
            <p className="text-3xl font-bold text-primary">{parameterValue} ppm</p>
          </div>
        ) : (
          <p className="text-muted-foreground">Click on the globe to see data</p>
        )}
      </CardContent>
    </Card>
  )
}

export default CurrentParameterLevels

