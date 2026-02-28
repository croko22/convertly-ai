"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { Sparkles, LayoutDashboard, FileText, Trash2, Settings, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const routes = [
    {
        label: "Pages",
        icon: LayoutDashboard,
        href: "/landings",
    },
    {
        label: "Trash",
        icon: Trash2,
        href: "/trash",
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/settings",
    },
];

export function Sidebar() {
    const pathname = usePathname();

    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800">
            <div className="p-6 flex items-center space-x-2">
                <Sparkles className="h-6 w-6 text-blue-600 dark:text-blue-500" />
                <Link href="/landings" className="font-bold text-lg tracking-tight hover:opacity-80 transition">
                    Convertly AI
                </Link>
            </div>

            <div className="flex-1 px-4 space-y-2">
                {routes.map((route) => (
                    <Link
                        key={route.href}
                        href={route.href}
                        className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${pathname === route.href || pathname.startsWith(route.href + "/")
                                ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 font-medium"
                                : "text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-zinc-50"
                            }`}
                    >
                        <route.icon className="h-5 w-5" />
                        <span>{route.label}</span>
                    </Link>
                ))}
            </div>

            <div className="p-4 mt-auto border-t border-zinc-200 dark:border-zinc-800 flex items-center space-x-3">
                <UserButton />
                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">My Account</span>
            </div>
        </div>
    );

    return (
        <>
            <div className="hidden md:flex h-full w-64 flex-col fixed inset-y-0 z-50">
                <SidebarContent />
            </div>

            <div className="md:hidden flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
                <div className="flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-500" />
                    <Link href="/landings" className="font-bold tracking-tight">Convertly AI</Link>
                </div>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle Navigation</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-64 border-none" aria-describedby={undefined}>
                        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                        <SidebarContent />
                    </SheetContent>
                </Sheet>
            </div>
        </>
    );
}
