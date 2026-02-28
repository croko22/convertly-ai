import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function PricingPage() {
    return (
        <div className="container mx-auto py-20 px-4 md:px-8 max-w-7xl font-sans">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
                    Simple, transparent pricing
                </h1>
                <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                    No hidden fees. No surprise charges. Just pay for what you need to generate high-converting landing pages.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Hobby Plan */}
                <Card className="flex flex-col relative">
                    <CardHeader>
                        <CardTitle className="text-2xl">Hobby</CardTitle>
                        <CardDescription>Perfect for side projects and testing the waters.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <div className="mb-6">
                            <span className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-50">$0</span>
                            <span className="text-zinc-500 dark:text-zinc-400">/month</span>
                        </div>
                        <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> 3 generated pages per month</li>
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Standard AI templates</li>
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Community support</li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full">Get Started</Button>
                    </CardFooter>
                </Card>

                {/* Pro Plan */}
                <Card className="flex flex-col relative border-blue-500 shadow-xl dark:border-blue-400 scale-105 z-10 bg-white dark:bg-zinc-900">
                    <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2">
                        <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            Most Popular
                        </span>
                    </div>
                    <CardHeader>
                        <CardTitle className="text-2xl text-blue-600 dark:text-blue-400">Pro</CardTitle>
                        <CardDescription>For creators and solopreneurs scaling their info-products.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <div className="mb-6">
                            <span className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-50">$29</span>
                            <span className="text-zinc-500 dark:text-zinc-400">/month</span>
                        </div>
                        <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> 50 generated pages per month</li>
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Advanced AI tailoring</li>
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Custom subdomains</li>
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Priority email support</li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Upgrade to Pro</Button>
                    </CardFooter>
                </Card>

                {/* Agency Plan */}
                <Card className="flex flex-col relative">
                    <CardHeader>
                        <CardTitle className="text-2xl">Agency</CardTitle>
                        <CardDescription>For teams managing multiple clients and products.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <div className="mb-6">
                            <span className="text-4xl font-extrabold text-zinc-900 dark:text-zinc-50">$99</span>
                            <span className="text-zinc-500 dark:text-zinc-400">/month</span>
                        </div>
                        <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Unlimited generated pages</li>
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Custom domain mapping</li>
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> Team collaboration</li>
                            <li className="flex items-center"><Check className="mr-2 h-4 w-4 text-green-500" /> 24/7 dedicated support</li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button variant="outline" className="w-full">Contact Sales</Button>
                    </CardFooter>
                </Card>
            </div>

            {/* FAQ Teaser */}
            <div className="mt-24 text-center">
                <h3 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">Have a large audience?</h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-6 max-w-md mx-auto">Contact us for custom pricing, enterprise features, and white-glove onboarding.</p>
                <Button variant="link" className="text-blue-600 dark:text-blue-400" size="lg">Talk to founders</Button>
            </div>
        </div>
    );
}
