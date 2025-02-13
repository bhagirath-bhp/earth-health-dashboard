import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

const ConfigMenu = ({ config, setConfig }) => {
  return (
    <div className="absolute bottom-4 left-4 w-80 text-white">
      <Card className="bg-black/50 border-cyan-500 border">
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rotation-speed">Rotation Speed</Label>
            <Slider
              id="rotation-speed"
              min={0}
              max={0.01}
              step={0.001}
              value={[config.rotationSpeed]}
              onValueChange={(value) => setConfig({ ...config, rotationSpeed: value[0] })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="particle-size">Particle Size</Label>
            <Slider
              id="particle-size"
              min={0.01}
              max={0.1}
              step={0.01}
              value={[config.particleSize]}
              onValueChange={(value) => setConfig({ ...config, particleSize: value[0] })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="glow-intensity">Glow Intensity</Label>
            <Slider
              id="glow-intensity"
              min={0}
              max={2}
              step={0.1}
              value={[config.glowIntensity]}
              onValueChange={(value) => setConfig({ ...config, glowIntensity: value[0] })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ConfigMenu

