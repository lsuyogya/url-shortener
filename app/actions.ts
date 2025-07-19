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
    const userId = session.user.id; // Explicitly narrow type to string
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
    revalidatePath("/");
  } catch (error) {
    console.error("Error creating link:", error);
  }
}

export async function deleteLatestLink() {
  "use server";
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    throw new Error("Unauthorized");
  }
  try {
    const latestLink = await prisma.link.findFirst({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (latestLink) {
      await prisma.link.delete({
        where: {
          id: latestLink.id,
        },
      });
      revalidatePath("/");
    } else {
      console.log("No links to delete.");
    }
  } catch (error) {
    console.error("Error deleting link:", error);
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