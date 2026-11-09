"use server";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import {
  createLinkForUser,
  deleteLinkForUser,
  updateLinkForUser,
} from "@/data/links";

const urlSchema = z
  .string()
  .trim()
  .min(1, "Enter a destination URL.")
  .max(2048, "The URL must be 2048 characters or fewer.")
  .url("Enter a valid URL.")
  .refine((value) => {
    try {
      const protocol = new URL(value).protocol;
      return protocol === "http:" || protocol === "https:";
    } catch {
      return false;
    }
  }, "Use a URL that starts with http:// or https://.");

const createLinkSchema = z.object({
  url: urlSchema,
  shortCode: z
    .string()
    .trim()
    .max(30, "The custom ending must be 30 characters or fewer.")
    .transform((value) => value.toLowerCase() || undefined)
    .refine(
      (value) => value === undefined || /^[a-z0-9_-]{3,30}$/.test(value),
      "Use 3–30 letters, numbers, hyphens, or underscores.",
    ),
});

const updateLinkSchema = z.object({
  id: z.number().int().positive(),
  url: urlSchema,
  shortCode: z
    .string()
    .trim()
    .max(30, "The custom ending must be 30 characters or fewer.")
    .transform((value) => value.toLowerCase())
    .refine(
      (value) => /^[a-z0-9_-]{3,30}$/.test(value),
      "Use 3–30 letters, numbers, hyphens, or underscores.",
    ),
});

const deleteLinkSchema = z.object({
  id: z.number().int().positive(),
});

export type CreateLinkInput = {
  url: string;
  shortCode: string;
};

export type UpdateLinkInput = {
  id: number;
  url: string;
  shortCode: string;
};

export type DeleteLinkInput = {
  id: number;
};

type CreateLinkResult = { error: string } | { shortCode: string };
type LinkMutationResult = { error: string } | { success: true };

export async function createLink(input: CreateLinkInput): Promise<CreateLinkResult> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { error: "Your session has expired. Sign in and try again." };
    }

    const parsedInput = createLinkSchema.safeParse(input);

    if (!parsedInput.success) {
      return { error: parsedInput.error.issues[0]?.message ?? "Check your link details." };
    }

    const result = await createLinkForUser({
      clerkUserId: userId,
      ...parsedInput.data,
    });

    if (result.error === "duplicate") {
      return { error: "That short link is already in use. Try another ending." };
    }

    if (result.error) {
      return { error: "Your link couldn’t be saved. Please try again." };
    }

    return { shortCode: result.data.shortCode };
  } catch (error) {
    console.error("Create link action failed.", error);
    return { error: "Your link couldn’t be saved. Please try again." };
  }
}

export async function updateLink(input: UpdateLinkInput): Promise<LinkMutationResult> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { error: "Your session has expired. Sign in and try again." };
    }

    const parsedInput = updateLinkSchema.safeParse(input);

    if (!parsedInput.success) {
      return { error: parsedInput.error.issues[0]?.message ?? "Check your link details." };
    }

    const result = await updateLinkForUser({
      clerkUserId: userId,
      ...parsedInput.data,
    });

    if (result.error === "duplicate") {
      return { error: "That short link is already in use. Try another ending." };
    }

    if (result.error === "not-found") {
      return { error: "This link could not be found in your workspace." };
    }

    if (result.error) {
      return { error: "Your link couldn’t be updated. Please try again." };
    }

    return { success: true };
  } catch (error) {
    console.error("Update link action failed.", error);
    return { error: "Your link couldn’t be updated. Please try again." };
  }
}

export async function deleteLink(input: DeleteLinkInput): Promise<LinkMutationResult> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { error: "Your session has expired. Sign in and try again." };
    }

    const parsedInput = deleteLinkSchema.safeParse(input);

    if (!parsedInput.success) {
      return { error: "This link could not be deleted. Refresh the page and try again." };
    }

    const result = await deleteLinkForUser(userId, parsedInput.data.id);

    if (result.error === "not-found") {
      return { error: "This link could not be found in your workspace." };
    }

    if (result.error) {
      return { error: "Your link couldn’t be deleted. Please try again." };
    }

    return { success: true };
  } catch (error) {
    console.error("Delete link action failed.", error);
    return { error: "Your link couldn’t be deleted. Please try again." };
  }
}