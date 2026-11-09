import { auth } from "@clerk/nextjs/server";
import { CalendarDays, Link2 } from "lucide-react";
import { getLinksForUser } from "@/data/links";
import { CreateLinkDialog } from "./create-link-dialog";
import { LinkItemActions } from "./link-item-actions";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    await auth.protect();
    return null;
  }

  const { data: userLinks, error } = await getLinksForUser(userId);

  return (
    <main className="relative flex-1 overflow-hidden bg-[#090d0b] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-0 size-[30rem] rounded-full bg-lime-400/[0.07] blur-[130px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
      </div>

      <section className="relative mx-auto w-full max-w-5xl px-6 py-14 sm:px-10 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="text-sm font-medium text-lime-300">Your workspace</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Your links
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400 sm:text-base">
              Keep track of the short links you’ve created and where they go.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-zinc-300">
              <span className="font-semibold text-white">{userLinks.length}</span>{" "}
              {userLinks.length === 1 ? "link" : "links"}
            </div>
            <CreateLinkDialog />
          </div>
        </div>

        {error ? (
          <div
            role="alert"
            className="mt-10 rounded-2xl border border-red-400/20 bg-red-400/[0.06] p-5 text-sm text-red-200"
          >
            Your links couldn’t be loaded right now. Please try again later.
          </div>
        ) : userLinks.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-white/[0.08] bg-[#101613]/80 px-6 py-14 text-center sm:px-10">
            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-lime-300/10 text-lime-300">
              <Link2 aria-hidden="true" className="size-5" />
            </div>
            <h2 className="mt-5 text-lg font-semibold text-white">No links yet</h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-400">
              Your links will show up here once you create one.
            </p>
          </div>
        ) : (
          <ul className="mt-10 divide-y divide-white/[0.07] overflow-hidden rounded-3xl border border-white/[0.08] bg-[#101613]/80">
            {userLinks.map((link) => (
              <li key={link.id} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:px-6">
                <div className="flex min-w-0 flex-1 items-start gap-4">
                  <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl bg-lime-300/10 text-lime-300">
                    <Link2 aria-hidden="true" className="size-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-lime-200">/{link.shortCode}</p>
                    <p className="mt-1 break-all text-sm leading-5 text-zinc-400">
                      {link.url}
                    </p>
                  </div>
                </div>
                <p className="inline-flex shrink-0 items-center gap-2 pl-14 text-xs text-zinc-500 sm:pl-0">
                  <CalendarDays aria-hidden="true" className="size-3.5" />
                  Created {link.createdAt.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <LinkItemActions
                  id={link.id}
                  shortCode={link.shortCode}
                  url={link.url}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}