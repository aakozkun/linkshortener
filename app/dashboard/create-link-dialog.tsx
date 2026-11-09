"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Check, Link2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createLink } from "./actions";

export function CreateLinkDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [createdCode, setCreatedCode] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);

    if (!nextOpen) {
      setUrl("");
      setShortCode("");
      setError(null);
      setCreatedCode(null);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await createLink({ url, shortCode });

      if ("error" in result) {
        setError(result.error);
        return;
      }

      setCreatedCode(result.shortCode);
      router.refresh();
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button className="h-10 gap-2 rounded-xl bg-lime-300 px-4 font-semibold text-zinc-950 hover:bg-lime-200" />
        }
      >
        <Plus aria-hidden="true" className="size-4" />
        Create link
      </DialogTrigger>
      <DialogContent className="max-w-lg border-white/10 bg-[#101613] p-6 text-white sm:rounded-2xl">
        {createdCode ? (
          <div className="py-2">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-lime-300/10 text-lime-300">
              <Check aria-hidden="true" className="size-5" />
            </div>
            <DialogHeader className="mt-5">
              <DialogTitle className="text-xl font-semibold text-white">
                Link created
              </DialogTitle>
              <DialogDescription className="text-zinc-400">
                Your link has been added to your workspace.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-5 flex items-center gap-3 rounded-xl border border-lime-300/15 bg-lime-300/[0.06] px-4 py-3">
              <Link2 aria-hidden="true" className="size-4 shrink-0 text-lime-300" />
              <span className="truncate text-sm font-medium text-lime-200">
                /{createdCode}
              </span>
            </div>
            <Button
              className="mt-6 h-10 w-full rounded-xl bg-lime-300 font-semibold text-zinc-950 hover:bg-lime-200"
              onClick={() => handleOpenChange(false)}
            >
              Done
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader className="pr-8">
              <DialogTitle className="text-xl font-semibold text-white">
                Create a short link
              </DialogTitle>
              <DialogDescription className="text-zinc-400">
                Add a destination URL and choose an optional custom ending.
              </DialogDescription>
            </DialogHeader>
            <form className="mt-2 space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="destination-url" className="text-zinc-200">
                  Destination URL
                </Label>
                <Input
                  id="destination-url"
                  name="url"
                  type="url"
                  inputMode="url"
                  autoComplete="url"
                  placeholder="https://example.com/a-long-page"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  required
                  maxLength={2048}
                  aria-invalid={Boolean(error)}
                  className="h-11 rounded-xl border-white/10 bg-black/20 text-white placeholder:text-zinc-600 focus-visible:border-lime-300/50 focus-visible:ring-lime-300/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="short-code" className="text-zinc-200">
                  Custom ending <span className="font-normal text-zinc-500">(optional)</span>
                </Label>
                <div className="flex h-11 items-center rounded-xl border border-white/10 bg-black/20 focus-within:border-lime-300/50">
                  <span className="shrink-0 pl-3.5 text-sm text-zinc-500">/</span>
                  <Input
                    id="short-code"
                    name="shortCode"
                    type="text"
                    autoCapitalize="none"
                    autoComplete="off"
                    placeholder="my-link"
                    value={shortCode}
                    onChange={(event) => setShortCode(event.target.value)}
                    maxLength={30}
                    aria-invalid={Boolean(error)}
                    className="h-full border-0 bg-transparent text-white shadow-none focus-visible:border-0 focus-visible:ring-0"
                  />
                </div>
                <p className="text-xs leading-5 text-zinc-500">
                  3–30 letters, numbers, hyphens, or underscores.
                </p>
              </div>
              {error && (
                <p role="alert" className="flex items-start gap-2 text-sm text-red-300">
                  <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                  {error}
                </p>
              )}
              <Button
                type="submit"
                disabled={isPending}
                className="h-11 w-full rounded-xl bg-lime-300 font-semibold text-zinc-950 hover:bg-lime-200"
              >
                {isPending ? "Creating link…" : "Create link"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}