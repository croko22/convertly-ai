import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { EditLandingForm } from "@/components/edit-landing-form";
import type { CourseLandingPage } from "@/lib/schemas";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function EditLandingPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const landingPage = await prisma.landingPage.findUnique({
        where: { id },
    });

    if (!landingPage) {
        return notFound();
    }

    const data = landingPage.sections as CourseLandingPage;

    return (
        <div className="w-full">
            <EditLandingForm id={id} initialData={data} initialSlug={landingPage.slug} />
        </div>
    );
}
