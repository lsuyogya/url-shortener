"use server";

import { prisma } from "../prisma";
import { encodeBase62 } from "@/lib/utils";
import { revalidatePath } from "next/cache";

import { auth } from "@/lib/auth";

export async function createLink(formData: FormData) {
  "use server";
  const originalUrl = formData.get("originalUrl") as string;
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      throw new Error("Unauthorized");
    }
    const userId = session.user.id;

    const urlRegex = new RegExp(
      /^https?:\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?::\d+)?(?:\/[^\s]*)?$/
    );

    if (!urlRegex.test(originalUrl)) {
      throw new Error("Invalid URL format.");
    }

    const existingLink = await prisma.link.findFirst({
      where: {
        originalUrl: originalUrl,
        userId: userId,
      },
    });

    if (existingLink) {
      throw new Error("URL already shortened by you.");
    }

    const newLink = await prisma.$transaction(async (tx) => {
      const link = await tx.link.create({
        data: {
          originalUrl: originalUrl,
          userId: userId,
        },
      });

      const min = 62 ** 5;
      const max = 62 ** 6 - 1;
      const randomPadding = Math.floor(Math.random() * (max - min + 1)) + min;
      const slug = encodeBase62(link.id + randomPadding);

      return await tx.link.update({
        where: {
          id: link.id,
        },
        data: {
          slug: slug,
        },
      });
    });
    revalidatePath("/dashboard");
  } catch (error) {
    console.error("Error creating link:", error);
    throw error; // Re-throw the error after logging
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
