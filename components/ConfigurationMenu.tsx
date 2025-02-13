import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

const ConfigurationMenu = ({ config, setConfig }) => {
  return (
    <Card className="w-80 bg-card/80 backdrop-blur-md border-primary/20 shadow-lg card-gradient">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gradient">Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="parameter" className="text-sm font-medium text-muted-foreground">
            Parameter
          </Label>
          <Select value={config.parameter} onValueChange={(value) => setConfig({ ...config, parameter: value })}>
            <SelectTrigger id="parameter" className="bg-secondary/50">
              <SelectValue placeholder="Select parameter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="carbon">Carbon</SelectItem>
              <SelectItem value="temperature">Temperature</SelectItem>
              <SelectItem value="humidity">Humidity</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="timeRange" className="text-sm font-medium text-muted-foreground">
            Time Range
          </Label>
          <Select value={config.timeRange} onValueChange={(value) => setConfig({ ...config, timeRange: value })}>
            <SelectTrigger id="timeRange" className="bg-secondary/50">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">1 Month</SelectItem>
              <SelectItem value="6m">6 Months</SelectItem>
              <SelectItem value="1y">1 Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="rotationSpeed" className="text-sm font-medium text-muted-foreground">
            Rotation Speed
          </Label>
          <Slider
            id="rotationSpeed"
            min={0}
            max={0.01}
            step={0.001}
            value={[config.rotationSpeed]}
            onValueChange={(value) => setConfig({ ...config, rotationSpeed: value[0] })}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="particleSize" className="text-sm font-medium text-muted-foreground">
            Particle Size
          </Label>
          <Slider
            id="particleSize"
            min={0.01}
            max={0.1}
            step={0.01}
            value={[config.particleSize]}
            onValueChange={(value) => setConfig({ ...config, particleSize: value[0] })}
            className="w-full"
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default ConfigurationMenu

