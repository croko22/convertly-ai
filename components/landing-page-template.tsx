import { type CourseLandingPage } from "@/lib/schemas";
import { Button } from "@/components/ui/button";

export function LandingPageTemplate({ data }: { data: CourseLandingPage }) {
    if (!data || !data.hero) return null;

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800">
            {/* Hero Section */}
            <section className="relative px-6 py-24 md:py-32 lg:py-40 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-white dark:from-zinc-900 dark:to-zinc-950 -z-10" />

                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 mb-8 leading-tight">
                        {data.hero.headline}
                    </h1>
                    <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                        {data.hero.subheadline}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <Button size="lg" className="h-14 px-10 text-lg font-medium w-full sm:w-auto shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                            {data.hero.ctaText}
                        </Button>
                    </div>
                </div>
            </section>

            {/* Features */}
            {data.features && data.features.length > 0 ? (
                <section className="py-24 px-6 max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50">Content Overview</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {data.features.map((opt, i) => (
                            <div key={i} className="bg-white dark:bg-zinc-900 border dark:border-zinc-800 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow group">
                                <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform">
                                    ✨
                                </div>
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-3">{opt.title}</h3>
                                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{opt.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            ) : null}

            {/* About Creator */}
            {data.aboutCreator ? (
                <section className="py-24 px-6 bg-zinc-100/50 dark:bg-zinc-900/20">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">{data.aboutCreator.heading}</h2>
                        <p className="text-lg md:text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed">{data.aboutCreator.bio}</p>
                    </div>
                </section>
            ) : null}

            {/* Testimonials */}
            {data.testimonials && data.testimonials.length > 0 ? (
                <section className="py-24 px-6 max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50">What People Say</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {data.testimonials.map((t, i) => (
                            <div key={i} className="bg-white dark:bg-zinc-900 border dark:border-zinc-800 p-8 rounded-2xl shadow-md">
                                <div className="flex gap-1 mb-4 text-yellow-400">
                                    {"★★★★★"}
                                </div>
                                <p className="text-zinc-700 dark:text-zinc-300 italic mb-6 text-lg">"{t.quote}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-bold text-zinc-500">
                                        {t.authorName.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-bold text-zinc-900 dark:text-zinc-50">{t.authorName}</p>
                                        {t.role ? <p className="text-sm text-zinc-500 dark:text-zinc-400">{t.role}</p> : null}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ) : null}

            {/* Pricing Section */}
            {data.pricing ? (
                <section className="px-6 pb-24 max-w-4xl mx-auto">
                    <div className="bg-zinc-900 dark:bg-zinc-950 text-white text-center rounded-[3rem] p-12 md:p-20 shadow-2xl border border-zinc-800">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to get started?</h2>
                        <div className="text-6xl md:text-7xl font-extrabold mb-10 text-white">
                            {data.pricing.price === 0 ? "Free" : `${data.pricing.price} ${data.pricing.currency}`}
                        </div>
                        <Button size="lg" className="h-16 px-12 text-xl font-bold shadow-xl hover:scale-105 transition-transform mb-6 bg-white text-zinc-900 hover:bg-zinc-100 rounded-full">
                            {data.hero.ctaText}
                        </Button>
                        {data.pricing.guarantee ? (
                            <p className="text-zinc-400 text-sm md:text-base mt-4 font-medium">{data.pricing.guarantee}</p>
                        ) : null}
                    </div>
                </section>
            ) : null}

            {/* Footer */}
            <footer className="py-8 text-center text-zinc-500 dark:text-zinc-600 text-sm border-t dark:border-zinc-800">
                Created with Convertly AI
            </footer>
        </div>
    );
}
