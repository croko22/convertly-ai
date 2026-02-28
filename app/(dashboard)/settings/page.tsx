import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
    const { userId } = await auth();

    if (!userId) {
        redirect("/");
    }

    return (
        <div className="container mx-auto p-8 max-w-5xl">
            <h1 className="text-3xl font-bold tracking-tight mb-8">Settings</h1>

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-8">
                <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
                <p className="text-zinc-500 dark:text-zinc-400 mb-6">
                    Manage your account preferences and subscription details here.
                </p>

                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg text-sm text-zinc-600 dark:text-zinc-300">
                    More settings coming soon! For now, you can manage your profile using the user icon in the sidebar.
                </div>
            </div>
        </div>
    );
}
