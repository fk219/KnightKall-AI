import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { name: "Mon", inbound: 120, outbound: 80 },
  { name: "Tue", inbound: 190, outbound: 120 },
  { name: "Wed", inbound: 160, outbound: 95 },
  { name: "Thu", inbound: 210, outbound: 140 },
  { name: "Fri", inbound: 180, outbound: 110 },
  { name: "Sat", inbound: 90, outbound: 60 },
  { name: "Sun", inbound: 70, outbound: 45 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/95 backdrop-blur-sm border border-border rounded-xl p-4 shadow-lg">
        <p className="font-semibold text-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center space-x-2 text-sm">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium text-foreground">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function CallVolumeChart() {
  return (
    <Card className="premium-card premium-card-hover">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold">Call Volume Trends</CardTitle>
            <CardDescription className="text-base">Daily inbound vs outbound call patterns</CardDescription>
          </div>
          <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="name" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              fontWeight={500}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              fontWeight={500}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ 
                paddingTop: '20px',
                fontSize: '14px',
                fontWeight: '500'
              }}
            />
            <Line
              type="monotone"
              dataKey="inbound"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, fill: "hsl(var(--primary))", strokeWidth: 2, stroke: "hsl(var(--background))" }}
              name="Inbound Calls"
            />
            <Line
              type="monotone"
              dataKey="outbound"
              stroke="hsl(var(--primary-light))"
              strokeWidth={3}
              dot={{ fill: "hsl(var(--primary-light))", strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, fill: "hsl(var(--primary-light))", strokeWidth: 2, stroke: "hsl(var(--background))" }}
              name="Outbound Calls"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}