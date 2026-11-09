"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Pencil, Trash2 } from "lucide-react";
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
import { deleteLink, updateLink } from "./actions";

type LinkItemActionsProps = {
  id: number;
  shortCode: string;
  url: string;
};

export function LinkItemActions({ id, shortCode, url }: LinkItemActionsProps) {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [destinationUrl, setDestinationUrl] = useState(url);
  const [editedShortCode, setEditedShortCode] = useState(shortCode);
  const [editError, setEditError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isEditPending, startEditTransition] = useTransition();
  const [isDeletePending, startDeleteTransition] = useTransition();

  function handleEditOpenChange(nextOpen: boolean) {
    if (isEditPending) return;

    setEditOpen(nextOpen);
    if (nextOpen) {
      setDestinationUrl(url);
      setEditedShortCode(shortCode);
      setEditError(null);
    }
  }

  function handleDeleteOpenChange(nextOpen: boolean) {
    if (isDeletePending) return;

    setDeleteOpen(nextOpen);
    if (nextOpen) setDeleteError(null);
  }

  function handleEditSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setEditError(null);

    startEditTransition(async () => {
      const result = await updateLink({
        id,
        url: destinationUrl,
        shortCode: editedShortCode,
      });

      if ("error" in result) {
        setEditError(result.error);
        return;
      }

      setEditOpen(false);
      router.refresh();
    });
  }

  function handleDelete() {
    setDeleteError(null);

    startDeleteTransition(async () => {
      const result = await deleteLink({ id });

      if ("error" in result) {
        setDeleteError(result.error);
        return;
      }

      setDeleteOpen(false);
      router.refresh();
    });
  }

  return (
    <div className="flex shrink-0 items-center gap-1 pl-14 sm:ml-2 sm:pl-0">
      <Dialog open={editOpen} onOpenChange={handleEditOpenChange}>
        <DialogTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={`Edit /${shortCode}`}
              title="Edit link"
              className="text-zinc-400 hover:bg-white/[0.07] hover:text-white"
            />
          }
        >
          <Pencil aria-hidden="true" className="size-4" />
        </DialogTrigger>
        <DialogContent className="max-w-lg border-white/10 bg-[#101613] p-6 text-white sm:rounded-2xl">
          <DialogHeader className="pr-8">
            <DialogTitle className="text-xl font-semibold text-white">
              Edit short link
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              Update the destination URL or the short link ending.
            </DialogDescription>
          </DialogHeader>
          <form className="mt-2 space-y-5" onSubmit={handleEditSubmit}>
            <div className="space-y-2">
              <Label htmlFor={`destination-url-${id}`} className="text-zinc-200">
                Destination URL
              </Label>
              <Input
                id={`destination-url-${id}`}
                name="url"
                type="url"
                inputMode="url"
                autoComplete="url"
                placeholder="https://example.com/a-long-page"
                value={destinationUrl}
                onChange={(event) => setDestinationUrl(event.target.value)}
                required
                maxLength={2048}
                aria-invalid={Boolean(editError)}
                className="h-11 rounded-xl border-white/10 bg-black/20 text-white placeholder:text-zinc-600 focus-visible:border-lime-300/50 focus-visible:ring-lime-300/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`short-code-${id}`} className="text-zinc-200">
                Short link ending
              </Label>
              <div className="flex h-11 items-center rounded-xl border border-white/10 bg-black/20 focus-within:border-lime-300/50">
                <span className="shrink-0 pl-3.5 text-sm text-zinc-500">/</span>
                <Input
                  id={`short-code-${id}`}
                  name="shortCode"
                  type="text"
                  autoCapitalize="none"
                  autoComplete="off"
                  value={editedShortCode}
                  onChange={(event) => setEditedShortCode(event.target.value)}
                  required
                  maxLength={30}
                  aria-invalid={Boolean(editError)}
                  className="h-full border-0 bg-transparent text-white shadow-none focus-visible:border-0 focus-visible:ring-0"
                />
              </div>
              <p className="text-xs leading-5 text-zinc-500">
                3–30 letters, numbers, hyphens, or underscores.
              </p>
            </div>
            {editError && (
              <p role="alert" className="flex items-start gap-2 text-sm text-red-300">
                <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                {editError}
              </p>
            )}
            <Button
              type="submit"
              disabled={isEditPending}
              className="h-11 w-full rounded-xl bg-lime-300 font-semibold text-zinc-950 hover:bg-lime-200"
            >
              {isEditPending ? "Saving changes…" : "Save changes"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteOpen} onOpenChange={handleDeleteOpenChange}>
        <DialogTrigger
          render={
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={`Delete /${shortCode}`}
              title="Delete link"
              className="text-zinc-400 hover:bg-red-400/10 hover:text-red-300"
            />
          }
        >
          <Trash2 aria-hidden="true" className="size-4" />
        </DialogTrigger>
        <DialogContent className="max-w-md border-white/10 bg-[#101613] p-6 text-white sm:rounded-2xl">
          <DialogHeader className="pr-8">
            <DialogTitle className="text-xl font-semibold text-white">
              Delete this link?
            </DialogTitle>
            <DialogDescription className="break-all text-zinc-400">
              The short link /{shortCode} will be permanently deleted. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {deleteError && (
            <p role="alert" className="flex items-start gap-2 text-sm text-red-300">
              <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              {deleteError}
            </p>
          )}
          <div className="mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              disabled={isDeletePending}
              onClick={() => handleDeleteOpenChange(false)}
              className="border-white/10 bg-white/[0.03] text-zinc-200 hover:bg-white/[0.08] hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={isDeletePending}
              onClick={handleDelete}
              className="h-10 rounded-xl px-4"
            >
              {isDeletePending ? "Deleting…" : "Delete link"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}