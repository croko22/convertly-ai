"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseLandingPageSchema, type CourseLandingPage } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { updateLandingPage } from "@/app/actions/landing";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";

import { LandingPageTemplate } from "@/components/landing-page-template";

export function EditLandingForm({ id, initialData, initialSlug }: { id: string; initialData: CourseLandingPage, initialSlug?: string }) {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const [slug, setSlug] = useState(initialSlug || "");

    const form = useForm<CourseLandingPage>({
        resolver: zodResolver(courseLandingPageSchema) as any,
        defaultValues: {
            hero: initialData.hero || { headline: "", subheadline: "", ctaText: "Get Access Now" },
            features: initialData.features || [],
            aboutCreator: initialData.aboutCreator || { heading: "", bio: "" },
            testimonials: initialData.testimonials || [],
            faqs: initialData.faqs || [],
            pricing: initialData.pricing || { price: 99, currency: "USD" },
        },
    });

    const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({
        control: form.control,
        name: "features",
    });

    // Real-time data for the live preview
    const watchedData = form.watch();

    async function onSubmit(data: CourseLandingPage) {
        setIsSaving(true);
        // We pass the local slug state up to the update action
        const result = await updateLandingPage(id, data, slug);
        setIsSaving(false);

        if (result.success) {
            toast.success("Page updated successfully!");
            router.push("/landings");
        } else {
            toast.error("Failed to update: " + result.error);
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 h-[calc(100vh-3.5rem)] overflow-hidden">
            {/* Left Column: Editor */}
            <div className="h-full overflow-y-auto border-r dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 flex flex-col pt-4">

                {/* Inline Slug Editor */}
                <div className="px-6 pb-6">
                    <Card>
                        <CardHeader className="pb-4">
                            <CardTitle className="text-sm font-medium text-zinc-500">Page Domain & Slug</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center text-sm font-mono overflow-hidden rounded-md border bg-white dark:bg-zinc-950 dark:border-zinc-800 focus-within:ring-2 focus-within:ring-zinc-400">
                                <span className="bg-zinc-100 dark:bg-zinc-900 px-3 py-2 border-r dark:border-zinc-800 text-zinc-500 select-none">
                                    convertly.ai/
                                </span>
                                <input
                                    type="text"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''))}
                                    placeholder="your-custom-slug"
                                    className="flex-1 px-3 py-2 w-full outline-none bg-transparent"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex-1 px-6 pb-20">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Hero Section</CardTitle>
                                    <CardDescription>The top section of your landing page.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="hero.headline"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Headline</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Mastering Next.js 14" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="hero.subheadline"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Subheadline</FormLabel>
                                                <FormControl>
                                                    <Textarea placeholder="Learn everything you need..." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="hero.ctaText"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Call to Action Button Text</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Get Access Now" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <CardTitle>Features / Modules</CardTitle>
                                            <CardDescription>What people get from this course.</CardDescription>
                                        </div>
                                        <Button type="button" variant="outline" size="sm" onClick={() => appendFeature({ title: "", description: "" })}>
                                            <Plus className="w-4 h-4 mr-2" /> Add Feature
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {featureFields.map((field, index) => (
                                        <div key={field.id} className="flex flex-col md:flex-row gap-4 items-start border p-4 rounded-md relative">
                                            <div className="flex-1 space-y-4 w-full">
                                                <FormField
                                                    control={form.control}
                                                    name={`features.${index}.title`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Title</FormLabel>
                                                            <FormControl><Input {...field} /></FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name={`features.${index}.description`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Description</FormLabel>
                                                            <FormControl><Textarea {...field} /></FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <Button type="button" variant="ghost" size="icon" className="text-red-500 absolute top-2 right-2 md:static" onClick={() => removeFeature(index)}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Pricing</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="pricing.price"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Price Number</FormLabel>
                                                <FormControl>
                                                    <Input type="number" step="0.01" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="pricing.currency"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Currency</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="pricing.guarantee"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Guarantee Text</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>

                            <div className="flex justify-end gap-4 sticky bottom-4 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-sm p-4 rounded-xl border shadow-lg mt-8">
                                <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSaving}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isSaving}>
                                    {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>

            {/* Right Column: Live Preview */}
            <div className="hidden lg:block h-full overflow-y-auto relative bg-white dark:bg-zinc-950">
                <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-medium tracking-wide">
                    Live Preview
                </div>
                <div className="pointer-events-none scale-[0.85] origin-top border shadow-2xl rounded-2xl overflow-hidden mt-12 mx-8 transition-all">
                    <LandingPageTemplate data={watchedData} />
                </div>
            </div>
        </div>
    );
}
