import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

const GraphSide = [7, 7, 7, 7, 3];

const Months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const getColor = (value: number) => {
  if (value === 0) return "bg-neutral-700";
  if (value === 1) return "bg-green-600";
  if (value === 2) return "bg-green-700";
  if (value === 3) return "bg-green-900";
  return "bg-green-500";
};

const ConsistencyGraph = () => {
  return (
    <ScrollArea className="mt-[40px] w-full overflow-x-auto">
      <div className="flex gap-4">
        {Months.map((month) => (
          <div key={Math.random()}>
            <p className="text-sm">{month}</p>
            <div className="flex gap-2">
              {GraphSide.map((size) => (
                <div key={Math.random()}>
                  {Array.from({ length: size }).map(() => (
                    <div
                      key={Math.random()}
                      className={`w-[12px] h-[12px] my-2 rounded-sm ${getColor(Math.floor(Math.random() * 4))}`}
                    ></div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ConsistencyGraph;
