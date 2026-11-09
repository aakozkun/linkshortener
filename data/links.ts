import { randomBytes } from "node:crypto";
import { and, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { links } from "@/db/schema";

type CreateLinkInput = {
  clerkUserId: string;
  url: string;
  shortCode?: string;
};

function isUniqueViolation(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "23505"
  );
}

export async function getLinksForUser(clerkUserId: string) {
  try {
    const userLinks = await db
      .select({
        id: links.id,
        shortCode: links.shortCode,
        url: links.url,
        createdAt: links.createdAt,
      })
      .from(links)
      .where(eq(links.clerkUserId, clerkUserId))
      .orderBy(desc(links.createdAt));

    return { data: userLinks, error: false } as const;
  } catch (error) {
    console.error("Failed to load dashboard links.", error);
    return { data: [], error: true } as const;
  }
}

export async function getLinkByShortCode(shortCode: string) {
  try {
    const [link] = await db
      .select({ url: links.url })
      .from(links)
      .where(eq(links.shortCode, shortCode))
      .limit(1);

    return { data: link ?? null, error: false } as const;
  } catch (error) {
    console.error("Failed to resolve a short link.", error);
    return { data: null, error: true } as const;
  }
}

export async function createLinkForUser({
  clerkUserId,
  url,
  shortCode,
}: CreateLinkInput) {
  const maxAttempts = shortCode ? 1 : 3;

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const code = shortCode ?? randomBytes(6).toString("base64url");

    try {
      await db.insert(links).values({ clerkUserId, shortCode: code, url });

      return { data: { shortCode: code }, error: false } as const;
    } catch (error) {
      if (isUniqueViolation(error)) {
        if (!shortCode && attempt < maxAttempts - 1) {
          continue;
        }

        return { data: null, error: "duplicate" } as const;
      }

      console.error("Failed to create a dashboard link.", error);
      return { data: null, error: "database" } as const;
    }
  }

  return { data: null, error: "duplicate" } as const;
}

type UpdateLinkInput = {
  clerkUserId: string;
  id: number;
  url: string;
  shortCode: string;
};

export async function updateLinkForUser({
  clerkUserId,
  id,
  url,
  shortCode,
}: UpdateLinkInput) {
  try {
    const [updatedLink] = await db
      .update(links)
      .set({ url, shortCode, updatedAt: new Date() })
      .where(and(eq(links.id, id), eq(links.clerkUserId, clerkUserId)))
      .returning({ id: links.id });

    if (!updatedLink) {
      return { data: null, error: "not-found" } as const;
    }

    return { data: updatedLink, error: false } as const;
  } catch (error) {
    if (isUniqueViolation(error)) {
      return { data: null, error: "duplicate" } as const;
    }

    console.error("Failed to update a dashboard link.", error);
    return { data: null, error: "database" } as const;
  }
}

export async function deleteLinkForUser(clerkUserId: string, id: number) {
  try {
    const [deletedLink] = await db
      .delete(links)
      .where(and(eq(links.id, id), eq(links.clerkUserId, clerkUserId)))
      .returning({ id: links.id });

    if (!deletedLink) {
      return { data: null, error: "not-found" } as const;
    }

    return { data: deletedLink, error: false } as const;
  } catch (error) {
    console.error("Failed to delete a dashboard link.", error);
    return { data: null, error: "database" } as const;
  }
}