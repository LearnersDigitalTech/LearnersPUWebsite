import type { Metadata } from "next";

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {

  const courseName = params.slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase()); // Convert to Title Case

  return {
    title: `${courseName} | Learners PU College`,
    description: `${courseName} course details, syllabus, faculty, and integrated coaching at Learners PU College.`,
    openGraph: {
      title: `${courseName} | Learners PU College`,
      description: `${courseName} stream with expert coaching and academic guidance.`,
      images: ["/og-course.jpg"],
    },
  };
}
