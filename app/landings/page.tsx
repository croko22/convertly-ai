import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar } from "lucide-react";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export default async function LandingsPage() {
    const headersList = await headers();
    const host = headersList.get("host") || "localhost:3000";
    const protocol = host.includes("localhost") ? "http" : "https";
    const baseDomain = host.replace(/^www\./, "");

    const landingPages = await prisma.landingPage.findMany({
        include: {
            course: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <div className="container mx-auto py-10 px-4 md:px-8 max-w-7xl font-sans">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Generated Pages
                    </h1>
                    <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
                        View all the landing pages created by Convertly AI.
                    </p>
                </div>
                <Link href="/">
                    <Button>Create New Page</Button>
                </Link>
            </div>

            {landingPages.length === 0 ? (
                <Card className="border-dashed border-2 bg-zinc-50/50 dark:bg-zinc-900/20">
                    <CardContent className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="h-12 w-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                            <span className="text-2xl">📄</span>
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                            No pages generated yet
                        </h3>
                        <p className="text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto mb-6">
                            You haven't generated any landing pages. Head back to the home page to create your first one.
                        </p>
                        <Link href="/">
                            <Button variant="outline">Go to Generator</Button>
                        </Link>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {landingPages.map((page) => (
                        <Card key={page.id} className="flex flex-col h-full hover:shadow-md transition-shadow dark:bg-zinc-900/50 dark:border-zinc-800">
                            <CardHeader>
                                <div className="flex justify-between items-start gap-4">
                                    <div>
                                        <CardTitle className="line-clamp-2 text-xl">{page.headline}</CardTitle>
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
                                <div className="flex items-center text-xs text-zinc-500 dark:text-zinc-400">
                                    <Calendar className="mr-2 h-3 w-3" />
                                    {new Date(page.createdAt).toLocaleDateString()}
                                </div>
                            </CardContent>
                            <CardFooter className="pt-4 border-t dark:border-zinc-800">
                                <div className="flex w-full gap-2">
                                    <Link href={`${protocol}://${page.slug}.${baseDomain}`} className="flex-1" passHref target="_blank">
                                        <Button variant="outline" className="w-full gap-2">
                                            <ExternalLink className="h-4 w-4" />
                                            Preview
                                        </Button>
                                    </Link>
                                    <Link href={`/landings/${page.id}/edit`} className="flex-1" passHref>
                                        <Button variant="default" className="w-full gap-2">
                                            Edit
                                        </Button>
                                    </Link>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
