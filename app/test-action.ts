import { prisma } from "../prisma";

export async function createTestEntry(message: string) {
  try {
    const newEntry = await prisma.testEntry.create({
      data: {
        message,
      },
    });
    console.log("New test entry created:", newEntry);
    return { success: true, data: newEntry };
  } catch (error) {
    console.error("Error creating test entry:", error);
    return { success: false, error: error.message };
  }
}
