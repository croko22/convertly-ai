"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { generateLandingPageSchema, type GenerateLandingPageInput } from "@/lib/schemas";

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<GenerateLandingPageInput>({
    resolver: zodResolver(generateLandingPageSchema),
    defaultValues: {
      sourceUrl: "",
      description: "",
    },
  });
  const router = useRouter();

  async function onSubmit(values: GenerateLandingPageInput) {
    setIsGenerating(true);
    try {
      const generateRes = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!generateRes.ok) {
        throw new Error("Failed to generate landing page content.");
      }

      const generatedData = await generateRes.json();

      const landingRes = await fetch("/api/landing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(generatedData),
      });

      if (!landingRes.ok) {
        throw new Error("Failed to save landing page.");
      }

      const result = await landingRes.json();

      toast.success("Landing page created successfully!", {
        description: "Redirecting...",
      });

      const protocol = window.location.protocol;
      const host = window.location.host.replace(/^www\./, "");
      window.location.href = `${protocol}//${result.slug}.${host}`;
    } catch (error: any) {
      toast.error(error.message || "An error occurred.");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4 dark:bg-zinc-950 font-sans">
      <div className="w-full max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Convertly <span className="text-blue-600 dark:text-blue-500">AI</span>
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Generate high-converting landing pages for your courses in seconds.
          </p>
        </div>

        <Card className="border-0 shadow-xl dark:bg-zinc-900/50 dark:border dark:border-zinc-800">
          <CardHeader>
            <CardTitle className="text-2xl">Create New Landing Page</CardTitle>
            <CardDescription>
              Paste a YouTube video URL or enter a short description of your course.
            </CardDescription>
          </CardHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="sourceUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>YouTube Video URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://www.youtube.com/watch?v=..."
                          className="bg-white dark:bg-zinc-950"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t dark:border-zinc-800" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white dark:bg-zinc-900/50 px-2 text-zinc-500">
                      Or enter text manually
                    </span>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Description / Transcript</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Explain what your course is about, who it is for, and what they will learn..."
                          className="min-h-[150px] bg-white dark:bg-zinc-950 resize-y"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-end bg-zinc-50/50 dark:bg-zinc-900/20 px-6 py-4 rounded-b-xl border-t dark:border-zinc-800">
                <Button
                  type="submit"
                  size="lg"
                  className="gap-2 font-medium w-full sm:w-auto"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                  {isGenerating ? "Generating..." : "Generate Landing Page"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
