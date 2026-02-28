import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    // Only allow vercel cron to trigger this
    const authHeader = request.headers.get("Authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // Find courses where deletedAt is older than 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const result = await prisma.course.deleteMany({
            where: {
                deletedAt: {
                    lte: thirtyDaysAgo
                }
            }
        });

        return NextResponse.json({
            success: true,
            deletedCount: result.count,
            message: `Successfully deleted ${result.count} courses.`
        });
    } catch (error: any) {
        console.error("Cron cleanup error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
