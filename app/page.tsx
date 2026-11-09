import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  Link2,
  MousePointerClick,
  ShieldCheck,
  Sparkles,
  WandSparkles,
} from "lucide-react";

const features = [
  {
    icon: Link2,
    title: "Shorten in seconds",
    description:
      "Turn long, unwieldy URLs into clean links that are easy to share anywhere.",
    accent: "text-lime-300",
    surface: "bg-lime-300/10",
  },
  {
    icon: WandSparkles,
    title: "Make them your own",
    description:
      "Create memorable links with custom endings that fit your name, brand, or campaign.",
    accent: "text-sky-300",
    surface: "bg-sky-300/10",
  },
  {
    icon: BarChart3,
    title: "Know what gets clicks",
    description:
      "See how your links are performing with clear, useful engagement insights.",
    accent: "text-violet-300",
    surface: "bg-violet-300/10",
  },
];

const sampleLinks = [
  { slug: "launch-day", destination: "acme.com/products/new", color: "bg-lime-300" },
  { slug: "weekly-update", destination: "acme.com/blog/weekly-update", color: "bg-sky-300" },
  { slug: "join-the-community", destination: "acme.com/community", color: "bg-violet-300" },
];

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="relative flex-1 overflow-hidden bg-[#090d0b] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-40 top-12 size-[28rem] rounded-full bg-lime-400/10 blur-[120px]" />
        <div className="absolute -right-36 top-40 size-[30rem] rounded-full bg-emerald-500/10 blur-[130px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
      </div>

      <section className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 pb-24 pt-16 sm:px-10 sm:pt-24 lg:grid-cols-[1fr_0.95fr] lg:gap-20 lg:pb-32 lg:pt-28">
        <div className="max-w-2xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-lime-300/20 bg-lime-300/[0.07] px-3.5 py-2 text-sm font-medium text-lime-200">
            <Sparkles aria-hidden="true" className="size-4" />
            Links, made a little more useful
          </div>

          <h1 className="text-balance text-5xl font-semibold leading-[1.06] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            Make every link
            <br />
            <span className="bg-gradient-to-r from-lime-200 via-lime-300 to-emerald-300 bg-clip-text text-transparent">
              go further.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-pretty text-lg leading-8 text-zinc-400 sm:text-xl">
            Create clean, memorable short links, keep them organized, and get a
            clearer picture of what your audience cares about.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="h-12 rounded-xl bg-lime-300 px-6 text-base font-semibold text-zinc-950 shadow-[0_0_35px_rgba(190,242,100,0.15)] hover:bg-lime-200"
              render={<a href="/sign-up" />}
            >
              Get started for free
              <ArrowRight aria-hidden="true" className="ml-1 size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-xl border-white/10 bg-white/[0.03] px-6 text-base text-zinc-200 hover:bg-white/[0.07] hover:text-white"
              render={<a href="#features" />}
            >
              Explore features
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-zinc-400">
            <span className="inline-flex items-center gap-2">
              <Check aria-hidden="true" className="size-4 text-lime-300" />
              Simple to use
            </span>
            <span className="inline-flex items-center gap-2">
              <Check aria-hidden="true" className="size-4 text-lime-300" />
              Made for sharing
            </span>
            <span className="inline-flex items-center gap-2">
              <Check aria-hidden="true" className="size-4 text-lime-300" />
              Insights at a glance
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
          <div
            aria-hidden="true"
            className="absolute -inset-8 rounded-[2rem] bg-gradient-to-br from-lime-300/10 via-emerald-300/5 to-transparent blur-2xl"
          />
          <div className="relative rounded-3xl border border-white/10 bg-[#101613]/95 p-4 shadow-2xl shadow-black/40 sm:p-6">
            <div className="flex items-center justify-between border-b border-white/[0.07] pb-5">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-lime-300/10 text-lime-300">
                  <Link2 aria-hidden="true" className="size-5" />
                </div>
                <div>
                  <p className="font-medium text-white">Your links</p>
                  <p className="mt-0.5 text-xs text-zinc-500">A home for the links you share</p>
                </div>
              </div>
              <span className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                Preview
              </span>
            </div>

            <div className="mt-5 rounded-2xl border border-white/[0.08] bg-black/20 p-4 sm:p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-400">Create a short link</span>
                <span className="text-[10px] uppercase tracking-[0.12em] text-zinc-600">Example</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-3.5">
                <Link2 aria-hidden="true" className="size-4 shrink-0 text-zinc-500" />
                <span className="truncate text-sm text-zinc-500">https://yourwebsite.com/a-very-long-link</span>
                <ArrowRight aria-hidden="true" className="ml-auto size-4 shrink-0 text-zinc-600" />
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-lime-300/15 bg-lime-300/[0.06] px-3.5 py-3">
                <span className="truncate text-sm font-medium text-lime-200">linkshortener.app/launch</span>
                <span className="inline-flex items-center gap-1.5 text-xs text-lime-200/70">
                  <Check aria-hidden="true" className="size-3.5" />
                  Ready to share
                </span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between px-1">
              <p className="text-sm font-medium text-zinc-300">Recent links</p>
              <span className="text-xs text-zinc-600">Sample preview</span>
            </div>
            <div className="mt-2 divide-y divide-white/[0.06]">
              {sampleLinks.map((link) => (
                <div key={link.slug} className="flex items-center gap-3 py-3.5">
                  <span className={`size-2 rounded-full ${link.color}`} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-zinc-200">{link.slug}</p>
                    <p className="mt-0.5 truncate text-xs text-zinc-500">{link.destination}</p>
                  </div>
                  <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 text-zinc-600" />
                </div>
              ))}
            </div>
          </div>
          <div className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-2xl border border-white/10 bg-[#151d18] px-4 py-3 shadow-xl sm:flex">
            <div className="flex size-9 items-center justify-center rounded-xl bg-emerald-300/10 text-emerald-300">
              <MousePointerClick aria-hidden="true" className="size-4" />
            </div>
            <div>
              <p className="text-xs font-medium text-white">Useful insights</p>
              <p className="mt-0.5 text-[11px] text-zinc-500">See what resonates</p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="relative border-t border-white/[0.07] bg-white/[0.015]">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-lime-300">Everything in one place</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">
              Small links. Big possibilities.
            </h2>
            <p className="mt-4 text-base leading-7 text-zinc-400 sm:text-lg">
              Spend less time managing URLs and more time making every share count.
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 transition-colors hover:border-white/[0.14] hover:bg-white/[0.04] sm:p-7"
                >
                  <div className={`flex size-12 items-center justify-center rounded-2xl ${feature.surface} ${feature.accent}`}>
                    <Icon aria-hidden="true" className="size-5" />
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-white">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{feature.description}</p>
                </article>
              );
            })}
          </div>

          <div className="mt-16 overflow-hidden rounded-3xl border border-lime-300/15 bg-gradient-to-r from-lime-300/[0.08] via-emerald-300/[0.05] to-transparent px-6 py-10 sm:px-10 lg:flex lg:items-center lg:justify-between lg:px-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-sm font-medium text-lime-200">
                <ShieldCheck aria-hidden="true" className="size-4" />
                Your links, all together
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Ready to make sharing simpler?
              </h2>
              <p className="mt-3 text-sm leading-6 text-zinc-400 sm:text-base">
                Get started with LinkShortener and bring a little more clarity to every URL.
              </p>
            </div>
            <Button
              size="lg"
              className="mt-7 h-11 rounded-xl bg-lime-300 px-5 font-semibold text-zinc-950 hover:bg-lime-200 lg:mt-0"
              render={<a href="/sign-up" />}
            >
              Create your account
              <ArrowRight aria-hidden="true" className="ml-1 size-4" />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
