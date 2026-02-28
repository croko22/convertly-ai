import { prisma } from "./lib/prisma";

async function main() {
    console.log("Fixing long slugs in database...");
    const pages = await prisma.landingPage.findMany();
    let count = 0;

    for (const p of pages) {
        if (p.slug.length > 60) {
            // DNS labels can't exceed 63 characters
            const newSlug = p.slug.substring(0, 40).replace(/-+$/, "") + "-" + Math.random().toString(36).substring(2, 7);
            await prisma.landingPage.update({
                where: { id: p.id },
                data: { slug: newSlug }
            });
            console.log(`Updated slug: ${p.slug} \n      -> ${newSlug}`);
            count++;
        }
    }

    console.log(`Fixed ${count} long slugs.`);
}

main().catch(console.error).finally(() => process.exit(0));
