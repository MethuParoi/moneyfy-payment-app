"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

export const description = "A donut chart with text";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function Chart() {
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  return (
    <Card className="flex flex-col border-transparent">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-[2rem]">Balance Chart</CardTitle>
        <CardDescription>January - Dec 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={20}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
}

//-----------------------------v01--------------------------

// "use client";

// import * as React from "react";
// import { TrendingUp } from "lucide-react";
// import { Label, Pie, PieChart } from "recharts";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";

// export const description = "A donut chart with text";

// const chartConfig = {
//   amount: {
//     label: "Amount",
//   },
//   "add-money": {
//     label: "Add Money",
//     color: "hsl(var(--chart-1))",
//   },
//   "send-money": {
//     label: "Send Money",
//     color: "hsl(var(--chart-2))",
//   },
// } satisfies ChartConfig;

// export function Chart({ transactionData }) {
//   const chartData = React.useMemo(() => {
//     const data = transactionData?.data?.reduce(
//       (acc, curr) => {
//         if (curr.transactionType === "add-money") {
//           acc.addMoney += curr.amount;
//         } else if (curr.transactionType === "send-money") {
//           acc.sendMoney += curr.amount;
//         }
//         return acc;
//       },
//       { addMoney: 0, sendMoney: 0 }
//     );
//     console.log("data", data);
//     return [
//       {
//         transactionType: "add-money",
//         amount: data?.addMoney,
//         fill: "var(--color-add-money)",
//       },
//       {
//         transactionType: "send-money",
//         amount: data?.sendMoney,
//         fill: "var(--color-send-money)",
//       },
//     ];
//   }, [transactionData]);

//   const totalAmount = React.useMemo(() => {
//     return chartData.reduce((acc, curr) => acc + curr.amount, 0);
//   }, [chartData]);

//   return (
//     <Card className="flex flex-col border-transparent">
//       <CardHeader className="items-center pb-0">
//         <CardTitle className="text-[2rem]">Balance Chart</CardTitle>
//         <CardDescription>January - Dec 2024</CardDescription>
//       </CardHeader>
//       <CardContent className="flex-1 pb-0">
//         <ChartContainer
//           config={chartConfig}
//           className="mx-auto aspect-square max-h-[250px]"
//         >
//           <PieChart>
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent hideLabel />}
//             />
//             <Pie
//               data={chartData}
//               dataKey="amount"
//               nameKey="transactionType"
//               innerRadius={60}
//               strokeWidth={20}
//             >
//               <Label
//                 content={({ viewBox }) => {
//                   if (viewBox && "cx" in viewBox && "cy" in viewBox) {
//                     return (
//                       <text
//                         x={viewBox.cx}
//                         y={viewBox.cy}
//                         textAnchor="middle"
//                         dominantBaseline="middle"
//                       >
//                         <tspan
//                           x={viewBox.cx}
//                           y={viewBox.cy}
//                           className="fill-foreground text-3xl font-bold"
//                         >
//                           {totalAmount.toLocaleString()}
//                         </tspan>
//                         <tspan
//                           x={viewBox.cx}
//                           y={(viewBox.cy || 0) + 24}
//                           className="fill-muted-foreground"
//                         >
//                           Amount
//                         </tspan>
//                       </text>
//                     );
//                   }
//                 }}
//               />
//             </Pie>
//           </PieChart>
//         </ChartContainer>
//       </CardContent>
//       {/* <CardFooter className="flex-col gap-2 text-sm">
//         <div className="flex items-center gap-2 font-medium leading-none">
//           Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
//         </div>
//         <div className="leading-none text-muted-foreground">
//           Showing total visitors for the last 6 months
//         </div>
//       </CardFooter> */}
//     </Card>
//   );
// }

//--------------------------V02--------------------------

// "use client";

// import * as React from "react";
// import { TrendingUp } from "lucide-react";
// import { Label, Pie, PieChart } from "recharts";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";

// export const description = "A donut chart with text";

// const chartConfig = {
//   amount: {
//     label: "Amount",
//   },
//   "add-money": {
//     label: "Add Money",
//     color: "hsl(var(--chart-1))",
//   },
//   "send-money": {
//     label: "Send Money",
//     color: "hsl(var(--chart-2))",
//   },
// } satisfies ChartConfig;

// export function Chart({ transactionData }) {
//   const chartData = React.useMemo(() => {
//     if (!transactionData || !transactionData.data) {
//       return [];
//     }

//     const data = transactionData.data.reduce(
//       (acc, curr) => {
//         if (curr.transactionType === "add-money") {
//           acc.addMoney += curr.amount;
//         } else if (curr.transactionType === "send-money") {
//           acc.sendMoney += curr.amount;
//         }
//         return acc;
//       },
//       { addMoney: 0, sendMoney: 0 }
//     );

//     return [
//       {
//         transactionType: "add-money",
//         amount: data.addMoney,
//         fill: "var(--color-add-money)",
//       },
//       {
//         transactionType: "send-money",
//         amount: data.sendMoney,
//         fill: "var(--color-send-money)",
//       },
//     ];
//   }, [transactionData]);

//   const totalAmount = React.useMemo(() => {
//     return chartData.reduce((acc, curr) => acc + curr.amount, 0);
//   }, [chartData]);

//   return (
//     <Card className="flex flex-col border-transparent">
//       <CardHeader className="items-center pb-0">
//         <CardTitle className="text-[2rem]">Balance Chart</CardTitle>
//         <CardDescription>January - Dec 2024</CardDescription>
//       </CardHeader>
//       <CardContent className="flex-1 pb-0">
//         <ChartContainer
//           config={chartConfig}
//           className="mx-auto aspect-square max-h-[250px]"
//         >
//           <PieChart>
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent hideLabel />}
//             />
//             <Pie
//               data={chartData}
//               dataKey="amount"
//               nameKey="transactionType"
//               innerRadius={60}
//               strokeWidth={20}
//             >
//               <Label
//                 content={({ viewBox }) => {
//                   if (viewBox && "cx" in viewBox && "cy" in viewBox) {
//                     return (
//                       <text
//                         x={viewBox.cx}
//                         y={viewBox.cy}
//                         textAnchor="middle"
//                         dominantBaseline="middle"
//                       >
//                         <tspan
//                           x={viewBox.cx}
//                           y={viewBox.cy}
//                           className="fill-foreground text-3xl font-bold"
//                         >
//                           {totalAmount.toLocaleString()}
//                         </tspan>
//                         <tspan
//                           x={viewBox.cx}
//                           y={(viewBox.cy || 0) + 24}
//                           className="fill-muted-foreground"
//                         >
//                           Amount
//                         </tspan>
//                       </text>
//                     );
//                   }
//                 }}
//               />
//             </Pie>
//           </PieChart>
//         </ChartContainer>
//       </CardContent>
//       {/* <CardFooter className="flex-col gap-2 text-sm">
//         <div className="flex items-center gap-2 font-medium leading-none">
//           Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
//         </div>
//         <div className="leading-none text-muted-foreground">
//           Showing total visitors for the last 6 months
//         </div>
//       </CardFooter> */}
//     </Card>
//   );
// }
