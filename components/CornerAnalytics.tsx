import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const CornerAnalytics = ({ selectedPoint }) => {
  const data = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 200 },
    { name: "Apr", value: 278 },
    { name: "May", value: 189 },
    { name: "Jun", value: 239 },
  ]

  return (
    <div className="absolute top-4 right-4 w-80 text-white">
      <Card className="bg-black/50 border-cyan-500 border">
        <CardHeader>
          <CardTitle>Carbon Levels</CardTitle>
        </CardHeader>
        <CardContent>
          {selectedPoint ? (
            <p>
              Lat: {selectedPoint.y.toFixed(2)}, Lon: {selectedPoint.x.toFixed(2)}, CO2:{" "}
              {(Math.random() * 100 + 300).toFixed(2)} ppm
            </p>
          ) : (
            <p>Click on the globe to see data</p>
          )}
          <div className="h-48 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{ backgroundColor: "#000", border: "1px solid #444" }}
                  labelStyle={{ color: "#fff" }}
                />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CornerAnalytics

