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
    redirect("/404");
  }

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

  await prisma.visit.create({
    data: {
      linkId: link.id,
    },
  });

  const Ad_Timer_seconds = 10;

  return (
    <RedirectBanner originalUrl={link.originalUrl} delay={Ad_Timer_seconds} />
  );
}
