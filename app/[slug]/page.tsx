import { prisma } from "@/prisma";
import { redirect } from "next/navigation";
import { RedirectBanner } from "@/components/RedirectBanner";

interface RedirectPageProps {
  params: {
    slug: string;
  };
}

export default async function RedirectPage({ params }: RedirectPageProps) {
  const { slug } = params;

  const link = await prisma.link.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!link) {
    redirect("/404"); // Redirect to a 404 page if the slug is not found
  }

  // Increment click count
  await prisma.link.update({
    where: {
      id: link.id,
    },
    data: {
      clicks: {
        increment: 1,
      },
    },
  });

  // Record visit
  await prisma.visit.create({
    data: {
      linkId: link.id,
      // You might want to capture more details like IP, user agent, etc.
      // For now, just linkId and timestamp
    },
  });

  const Ad_Timer_seconds = 30;

  return (
    <RedirectBanner originalUrl={link.originalUrl} delay={Ad_Timer_seconds} />
  );
}
