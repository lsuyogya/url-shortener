import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";

export async function createLink() {
  "use server";
  try {
    await prisma.link.create({
      data: {
        slug: `test-link-${Date.now()}`,
        originalUrl: "https://example.com",
        userId: "cmd9pn5c20001v2isn1gbw9kz", // Replace with a valid userId from your database or create a dummy one
      },
    });
    revalidatePath("/");
  } catch (error) {
    console.error("Error creating link:", error);
  }
}

export async function deleteLatestLink() {
  "use server";
  try {
    const latestLink = await prisma.link.findFirst({
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
