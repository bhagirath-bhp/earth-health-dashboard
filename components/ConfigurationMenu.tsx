import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

const ConfigurationMenu = ({ config, setConfig }) => {
  return (
    <Card className="w-80 bg-black/50 border-cyan-500 border">
      <CardHeader>
        <CardTitle>Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="parameter">Parameter</Label>
          <Select value={config.parameter} onValueChange={(value) => setConfig({ ...config, parameter: value })}>
            <SelectTrigger id="parameter">
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
          <Label htmlFor="timeRange">Time Range</Label>
          <Select value={config.timeRange} onValueChange={(value) => setConfig({ ...config, timeRange: value })}>
            <SelectTrigger id="timeRange">
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
          <Label htmlFor="region">Region</Label>
          <Select value={config.region} onValueChange={(value) => setConfig({ ...config, region: value })}>
            <SelectTrigger id="region">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="global">Global</SelectItem>
              <SelectItem value="northAmerica">North America</SelectItem>
              <SelectItem value="europe">Europe</SelectItem>
              <SelectItem value="asia">Asia</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}

export default ConfigurationMenu

