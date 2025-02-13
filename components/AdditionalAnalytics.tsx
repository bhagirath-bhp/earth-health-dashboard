import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const AdditionalAnalytics = ({ selectedPoint, config }) => {
  const data = [
    { name: "Region A", emissions: 4000 },
    { name: "Region B", emissions: 3000 },
    { name: "Region C", emissions: 2000 },
    { name: "Region D", emissions: 2780 },
    { name: "Region E", emissions: 1890 },
  ]

  return (
    <Card className="w-80 bg-card/80 backdrop-blur-md border-primary/20 shadow-lg card-gradient">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gradient">Carbon Emissions by Region</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
              <YAxis stroke="rgba(255,255,255,0.5)" />
              <Tooltip
                contentStyle={{ backgroundColor: "rgba(0,0,0,0.8)", border: "1px solid rgba(255,255,255,0.1)" }}
                labelStyle={{ color: "#fff" }}
              />
              <Bar dataKey="emissions" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export default AdditionalAnalytics

