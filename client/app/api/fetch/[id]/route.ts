import db from "@/lib/db";
import ObjectID from "bson-objectid";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const chartId = params.id;
    if (!ObjectID.isValid(chartId)) throw new Error("Invalid id");

    const chartData = await db.chart.findUnique({
      where: {
        id: chartId,
      },
    });

    if (!chartData) throw new Error("Chart not found");

    return NextResponse.json({
      id: chartData.id,
      symbol: chartData.symbol,
      classNames: chartData.classNames,
      height: chartData.chartHeight,
      width: chartData.chartWidth,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
