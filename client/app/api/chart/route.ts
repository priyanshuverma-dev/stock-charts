import { auth } from "@/auth";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) throw new Error("login to create chart");

    const { name, symbol } = await req.json();

    const user = await db.user.findUnique({
      where: {
        email: session.user?.email!,
      },
    });

    if (!user) throw new Error("logged user not found");

    if (!name || !symbol) throw new Error("name and symbol required");

    const chart = await db.chart.create({
      data: {
        name,
        symbol,
        userId: user.id,
      },
    });

    return NextResponse.json({
      message: "created successfully",
      id: chart.id,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
