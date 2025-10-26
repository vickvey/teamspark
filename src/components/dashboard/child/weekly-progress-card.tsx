import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const WeeklyProgressCard: React.FC = () => (
  <Card className="md:col-span-2 p-6">
    <CardHeader>
      <CardTitle className="text-lg font-semibold">
        📈 Weekly Progress
      </CardTitle>
    </CardHeader>

    <CardContent>
      <div className="grid grid-cols-7 gap-3 text-center">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, idx) => (
          <div key={idx} className="bg-green-100 rounded-lg py-4">
            <p className="font-semibold">{day}</p>
            <p className="text-green-700 font-bold">{4} ⭐</p>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default WeeklyProgressCard;
