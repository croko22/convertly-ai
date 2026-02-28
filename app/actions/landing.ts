"use server";

import { prisma } from "@/lib/prisma";
import { courseLandingPageSchema, type CourseLandingPage } from "@/lib/schemas";
import { revalidatePath } from "next/cache";

export async function updateLandingPage(id: string, data: CourseLandingPage, slug?: string) {
    try {
        // Validate the data again on the server
        const validated = courseLandingPageSchema.parse(data);

        const updateData: any = {
            headline: validated.hero.headline,
            subheadline: validated.hero.subheadline,
            sections: validated as any,
        };

        if (slug) {
            updateData.slug = slug;
        }

        await prisma.landingPage.update({
            where: { id },
            data: updateData,
        });

        // Also update the course title/description based on hero slightly if you want,
        // but let's keep it simple and just update the landing page JSON.

        revalidatePath("/landings");
        revalidatePath(`/landings/${id}/edit`);

        return { success: true };
    } catch (e: any) {
        console.error("Failed to update landing page", e);
        return { success: false, error: e.message };
    }
}

export async function trashCourse(courseId: string) {
    try {
        await prisma.course.update({
            where: { id: courseId },
            data: { deletedAt: new Date() }
        });
        revalidatePath("/landings");
        revalidatePath("/trash");
        return { success: true };
    } catch (e: any) {
        console.error("Failed to trash course", e);
        return { success: false, error: e.message };
    }
}

export async function restoreCourse(courseId: string) {
    try {
        await prisma.course.update({
            where: { id: courseId },
            data: { deletedAt: null }
        });
        revalidatePath("/landings");
        revalidatePath("/trash");
        return { success: true };
    } catch (e: any) {
        console.error("Failed to restore course", e);
        return { success: false, error: e.message };
    }
}

export async function deleteCourse(courseId: string) {
    try {
        await prisma.course.delete({
            where: { id: courseId }
        });
        revalidatePath("/landings");
        revalidatePath("/trash");
        return { success: true };
    } catch (e: any) {
        console.error("Failed to delete course", e);
        return { success: false, error: e.message };
    }
}
