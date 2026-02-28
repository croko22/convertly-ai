import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { type CourseLandingPage } from "@/lib/schemas";
import { LandingPageTemplate } from "@/components/landing-page-template";

export default async function LandingPagePreview({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const landingPage = await prisma.landingPage.findUnique({
        where: { slug },
        include: { course: true },
    });

    if (!landingPage) {
        return notFound();
    }

    const data = landingPage.sections as CourseLandingPage;

    return <LandingPageTemplate data={data} />;
}
