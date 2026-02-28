import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, ArrowLeft } from "lucide-react";
import { headers } from "next/headers";
import { TrashActions } from "@/components/trash-actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function TrashPage() {
    const { userId } = await auth();
    if (!userId) return redirect("/sign-in");

    const headersList = await headers();
    const host = headersList.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    const baseDomain = host.replace(/^www\./, "");

    const landingPages = await prisma.landingPage.findMany({
        where: {
            course: {
                userId,
                deletedAt: {
                    not: null
                }
            }
        },
        include: {
            course: true,
        },
        orderBy: {
            course: {
                deletedAt: "desc"
            }
        },
    });

    const calculateDaysLeft = (deletedAt: Date | null) => {
        if (!deletedAt) return 0;
        const deleteDate = new Date(deletedAt);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - deleteDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return Math.max(0, 30 - diffDays);
    };

    return (
        <div className="container mx-auto py-10 px-4 md:px-8 max-w-7xl font-sans">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-4xl flex items-center gap-3 font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                        <Link href="/landings" className="text-zinc-400 hover:text-zinc-600 transition-colors">
                            <ArrowLeft className="h-8 w-8" />
                        </Link>
                        Trash
                    </h1>
                    <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
                        Pages in the trash are permanently deleted after 30 days.
                    </p>
                </div>
            </div>

            {landingPages.length === 0 ? (
                <Card className="border-dashed border-2 bg-zinc-50/50 dark:bg-zinc-900/20">
                    <CardContent className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="h-12 w-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                            <span className="text-2xl">🗑️</span>
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                            Trash is empty
                        </h3>
                        <p className="text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto mb-6">
                            No pages have been moved to the trash recently.
                        </p>
                        <Link href="/landings">
                            <Button variant="outline">Back to Pages</Button>
                        </Link>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {landingPages.map((page) => (
                        <Card key={page.id} className="flex flex-col h-full hover:shadow-md transition-shadow dark:bg-zinc-900/50 dark:border-zinc-800 relative opacity-75">
                            <div className="absolute top-4 right-4 flex gap-1 z-10">
                                <TrashActions courseId={page.courseId} />
                                <TrashActions courseId={page.courseId} isHardDelete={true} />
                            </div>

                            <CardHeader>
                                <div className="flex justify-between items-start gap-4">
                                    <div className="pr-16">
                                        <CardTitle className="line-clamp-2 text-xl line-through text-zinc-500">{page.headline}</CardTitle>
                                        <CardDescription className="line-clamp-2 mt-2">
                                            {page.subheadline}
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <div className="bg-zinc-100 dark:bg-zinc-950/50 rounded-md p-3 mb-4">
                                    <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                        Linked Course:
                                    </p>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400 truncate mt-1">
                                        {page.course?.title || "Unknown Course"}
                                    </p>
                                </div>
                                <div className="flex items-center text-xs text-red-500 dark:text-red-400 font-medium">
                                    <Calendar className="mr-2 h-3 w-3" />
                                    Deletes permanently in {calculateDaysLeft(page.course?.deletedAt || null)} days
                                </div>
                            </CardContent>
                            <CardFooter className="pt-4 border-t dark:border-zinc-800">
                                <div className="flex w-full gap-2">
                                    <Button variant="outline" className="w-full gap-2" disabled>
                                        <ExternalLink className="h-4 w-4" />
                                        Preview Unavailable
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
