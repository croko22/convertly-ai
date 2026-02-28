import Link from "next/link";
import { Sparkles, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/60">
            <div className="container mx-auto flex h-14 max-w-screen-xl items-center justify-between px-4">
                <div className="flex items-center space-x-4">
                    <Link href="/" className="flex items-center space-x-2">
                        <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-500" />
                        <span className="font-bold tracking-tight">Convertly AI</span>
                    </Link>
                </div>
                <div className="flex items-center justify-end space-x-4">
                    <nav className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
                            <Link href="/pricing">Pricing</Link>
                        </Button>
                        <SignedIn>
                            <Button variant="ghost" size="sm" asChild className="hidden sm:flex">
                                <Link href="/landings">My Pages</Link>
                            </Button>
                            <UserButton />
                        </SignedIn>
                        <SignedOut>
                            <SignInButton mode="modal">
                                <Button variant="ghost" size="sm" className="hidden sm:flex">
                                    Log in
                                </Button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <Button variant="default" size="sm">
                                    Get Started
                                </Button>
                            </SignUpButton>
                        </SignedOut>
                        <Button variant="ghost" size="icon" asChild className="ml-2">
                            <Link href="https://github.com/croko22/convertly-ai" target="_blank" rel="noreferrer">
                                <Github className="h-4 w-4" />
                                <span className="sr-only">GitHub</span>
                            </Link>
                        </Button>
                    </nav>
                </div>
            </div>
        </header>
    );
}
