import { auth } from "@/auth";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) throw new Error("login to fetch chart");

    const user = await db.user.findUnique({
      where: {
        email: session.user?.email!,
      },
    });

    if (!user) throw new Error("logged user not found");

    const charts = await db.chart.findMany({
      where: {
        userId: user.id,
      },
    });

    return NextResponse.json(charts);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
