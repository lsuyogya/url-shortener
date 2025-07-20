"use server";

import { prisma } from "../prisma";
import { encodeBase62 } from "@/lib/utils";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";

export async function createLink(formData: FormData): Promise<{
  success: boolean;
  error?: string;
}> {
  "use server";
  const originalUrl = formData.get("originalUrl") as string;
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      return { success: false, error: "Unauthorized" };
    }
    const userId = session.user.id;

    const urlRegex = new RegExp(
      /^https?:\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?::\d+)?(?:\/[^\s]*)?$/
    );

    if (!urlRegex.test(originalUrl)) {
      return { success: false, error: "Invalid URL format." };
    }

    const existingLink = await prisma.link.findFirst({
      where: {
        originalUrl: originalUrl,
        userId: userId,
      },
    });

    if (existingLink) {
      return { success: false, error: "URL is already shortened." };
    }

    const slug = encodeBase62(Date.now() + Math.random());

    await prisma.link.create({
      data: {
        originalUrl: originalUrl,
        userId: userId,
        slug: slug,
      },
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Error creating link:", error);
    return { success: false, error: "An unexpected error occurred." };
  }
}

export async function getLinks() {
  "use server";
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    throw new Error("Unauthorized");
  }
  const links = await prisma.link.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      visits: {
        orderBy: {
          timestamp: "desc",
        },
        take: 1,
      },
    },
  });
  return links;
}
