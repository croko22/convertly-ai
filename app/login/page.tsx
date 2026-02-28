"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Github, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            toast.success("Welcome back!", {
                description: "This is a placeholder login. Normally this would authenticate you.",
            });
            router.push("/");
        }, 1200);
    };

    return (
        <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-950 font-sans">
            <div className="w-full max-w-sm space-y-6">
                <div className="flex flex-col items-center space-y-2 text-center">
                    <Sparkles className="h-10 w-10 text-blue-600 dark:text-blue-500" />
                    <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Welcome back
                    </h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Enter your email completely in vain to sign in to your non-existent account
                    </p>
                </div>

                <Card className="border-0 shadow-lg dark:border dark:border-zinc-800 dark:bg-zinc-900/50">
                    <CardHeader>
                        <CardTitle>Sign in</CardTitle>
                        <CardDescription>
                            Choose your preferred sign in method
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-4">
                            <Button variant="outline" className="w-full font-medium" onClick={() => toast.info("GitHub Login Simulator", { description: "Beep boop." })}>
                                <Github className="mr-2 h-4 w-4" />
                                Continue with GitHub
                            </Button>
                            <Button variant="outline" className="w-full font-medium" onClick={() => toast.info("Google Login Simulator", { description: "Boop beep." })}>
                                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                                Continue with Google
                            </Button>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t dark:border-zinc-800" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white dark:bg-zinc-900 px-2 text-zinc-500">
                                    Or continue with email
                                </span>
                            </div>
                        </div>

                        <form onSubmit={onSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    placeholder="m@example.com"
                                    required
                                    type="email"
                                    className="bg-white dark:bg-zinc-950"
                                    autoComplete="email"
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    <Link href="#" className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-500 font-medium">
                                        Forgot password?
                                    </Link>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="bg-white dark:bg-zinc-950"
                                    disabled={isLoading}
                                />
                            </div>
                            <Button className="w-full" type="submit" disabled={isLoading}>
                                {isLoading ? "Signing in..." : "Sign in"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
                <div className="text-center text-sm text-zinc-500 dark:text-zinc-400">
                    Don&apos;t have an account?{" "}
                    <Link href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-500">
                        Sign up for free
                    </Link>
                </div>
            </div>
        </div>
    );
}
