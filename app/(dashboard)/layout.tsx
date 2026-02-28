"use client";

import { Sidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950">
            <Sidebar />
            <main className="flex-1 w-full md:pl-64 overflow-y-auto">
                <div className="h-full w-full">{children}</div>
            </main>
        </div>
    );
}
