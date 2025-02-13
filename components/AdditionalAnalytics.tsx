import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const AdditionalAnalytics = ({ selectedPoint, config }) => {
  // Placeholder data
  const data = [
    { name: "Region A", emissions: 4000 },
    { name: "Region B", emissions: 3000 },
    { name: "Region C", emissions: 2000 },
    { name: "Region D", emissions: 2780 },
    { name: "Region E", emissions: 1890 },
  ]

  return (
    <Card className="w-80 bg-black/50 border-cyan-500 border">
      <CardHeader>
        <CardTitle>Carbon Emissions by Region</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip
                contentStyle={{ backgroundColor: "#000", border: "1px solid #444" }}
                labelStyle={{ color: "#fff" }}
              />
              <Bar dataKey="emissions" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default AdditionalAnalytics

