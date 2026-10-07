import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { ArrowRightIcon } from "@/components/icons";
import { ProjectImage } from "@/components/ProjectImage";
import { getPublishedPosts } from "@/content/blog";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Blog & Resources",
  description:
    "Practical guides on permits, timelines, and what to expect from a construction project in Calgary, Airdrie, Chestermere & Cochrane, AB, from AM Builders.",
  path: "/blog",
});

// Rebuilt hourly so a scheduled post appears on its publication date
// without waiting for the next deploy.
export const revalidate = 3600;

export default function BlogPage() {
  const posts = getPublishedPosts();

  return (
    <main className="py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-serif text-4xl text-charcoal-900 sm:text-5xl">Blog &amp; Resources</h1>
          <p className="mt-4 text-charcoal-600">
            Plain-language guides on permits, timelines, and what to expect from a construction
            project in Calgary and area.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="mt-12 text-center text-charcoal-600">
            New articles are on the way — check back soon.
          </p>
        ) : (
          <div className="mx-auto mt-12 max-w-3xl space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block overflow-hidden rounded-2xl border border-charcoal-100 bg-cream-50 shadow-sm transition hover:-translate-y-0.5 hover:border-clay-300 hover:shadow-md sm:flex"
              >
                <div className="sm:w-64 sm:shrink-0">
                  <ProjectImage
                    src={post.heroImage?.src}
                    alt={post.heroImage?.alt ?? post.title}
                    label={post.title}
                    className="rounded-none"
                  />
                </div>
                <div className="p-8">
                  <p className="text-xs font-medium uppercase tracking-wide text-charcoal-500">
                    {new Date(post.publishedAt).toLocaleDateString("en-CA", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <h2 className="mt-2 font-serif text-2xl text-charcoal-900">{post.title}</h2>
                  <p className="mt-3 text-charcoal-600">{post.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-clay-600 transition group-hover:text-clay-700">
                    Read more
                    <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
