import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { ProjectImage } from "@/components/ProjectImage";
import { getPublishedPosts, getBlogPost, type BlogBlock } from "@/content/blog";
import { getBlogPostSchema } from "@/lib/json-ld";
import { buildMetadata } from "@/lib/metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

// Only published posts are prerendered, so a scheduled post is absent from
// the build output and therefore out of the sitemap until its date arrives.
export function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

// Unlike the rest of the site, unknown slugs are allowed through so a post can
// go live on its date without a redeploy. getBlogPost still refuses anything
// unpublished, so a future-dated URL 404s until it is actually due.
export const dynamicParams = true;
export const revalidate = 3600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.title,
    description: post.metaDescription,
    path: `/blog/${post.slug}`,
  });
}

function Block({ block, sectionLabel }: { block: BlogBlock; sectionLabel: string }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p
          className="leading-relaxed text-charcoal-700"
          // Content is authored by us in content/blog.ts, never user input.
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      );
    case "tip":
      return (
        <div className="rounded-lg border-l-4 border-gold-600 bg-white p-4 shadow-sm">
          <p className="text-[11px] font-bold uppercase tracking-wider text-clay-600">Tip</p>
          <p className="mt-0.5 font-semibold text-charcoal-900">{block.text}</p>
        </div>
      );
    case "image":
      return (
        <figure>
          <ProjectImage src={block.src} alt={block.alt} label={sectionLabel} className="aspect-[16/9]" />
          {block.src && <figcaption className="mt-2 text-center text-sm text-charcoal-500">{block.alt}</figcaption>}
        </figure>
      );
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <main className="py-24">
      <Container className="mx-auto max-w-3xl">
        <Link href="/blog" className="text-sm font-semibold text-clay-600 hover:text-clay-700">
          &larr; Back to Blog &amp; Resources
        </Link>

        <h1 className="mt-6 font-serif text-4xl text-charcoal-900 sm:text-5xl">{post.title}</h1>
        <p className="mt-3 text-xs font-medium uppercase tracking-wide text-charcoal-500">
          {post.author && (
            <>
              By <span className="text-gold-600">{post.author}</span>
              {post.authorTitle && `, ${post.authorTitle}`} &nbsp;|&nbsp;
            </>
          )}
          {new Date(post.publishedAt).toLocaleDateString("en-CA", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          {post.readingTime && <>&nbsp;|&nbsp; {post.readingTime}</>}
        </p>

        {post.heroImage && (
          <figure className="mt-8">
            <ProjectImage src={post.heroImage.src} alt={post.heroImage.alt} label="Hero image" className="aspect-[16/9]" />
            {post.heroImage.src && (
              <figcaption className="mt-2 text-center text-sm text-charcoal-500">{post.heroImage.alt}</figcaption>
            )}
          </figure>
        )}

        {post.quickAnswer && (
          <div className="mt-10 rounded-xl bg-gold-600 p-6 text-cream-50 sm:p-7">
            <p className="text-xs font-bold uppercase tracking-widest text-clay-300">Quick Answer</p>
            <p className="mt-2 leading-relaxed">{post.quickAnswer.summary}</p>
            {post.quickAnswer.points && post.quickAnswer.points.length > 0 && (
              <ul className="mt-3 list-disc space-y-1.5 pl-5">
                {post.quickAnswer.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {post.sections.length > 1 && (
          <nav aria-label="Table of contents" className="mt-8 rounded-xl border border-charcoal-100 bg-cream-50 p-6">
            <p className="font-semibold text-charcoal-900">In this article</p>
            {/* Headings already carry their own "1.", "2." prefixes (see
                content/blog.ts), so this list stays unmarked rather than
                double-numbering them. */}
            <ul className="mt-3 space-y-1.5 text-sm">
              {post.sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="text-charcoal-700 hover:text-clay-600">
                    {section.heading}
                  </a>
                </li>
              ))}
              {post.faq && (
                <li>
                  <a href="#faq" className="text-charcoal-700 hover:text-clay-600">
                    Frequently Asked Questions
                  </a>
                </li>
              )}
            </ul>
          </nav>
        )}

        <div className="mt-10 space-y-10">
          {post.sections.map((section) => (
            <div key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="border-l-4 border-clay-300 pl-3 font-serif text-2xl text-charcoal-900">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4">
                {section.blocks.map((block, index) => (
                  <Block key={index} block={block} sectionLabel={section.heading} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {post.seriesRecap && (
          <div className="mt-16 rounded-xl border border-charcoal-100 bg-cream-50 p-6 sm:p-7">
            <p className="font-semibold text-charcoal-900">{post.seriesRecap.heading}</p>
            <p className="mt-2 text-sm text-charcoal-600">{post.seriesRecap.intro}</p>
            <ol className="mt-4 space-y-2.5 text-sm">
              {post.seriesRecap.items.map((item, index) => (
                <li key={item.label} className="text-charcoal-700">
                  <span className="font-medium text-charcoal-500">{index + 1}.</span>{" "}
                  {item.href ? (
                    <Link href={item.href} className="font-semibold text-clay-600 hover:text-clay-700">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="font-semibold text-charcoal-500">{item.label}</span>
                  )}{" "}
                  &mdash; {item.description}
                </li>
              ))}
            </ol>
          </div>
        )}

        {post.cta && (
          <div className="mt-16 rounded-2xl bg-charcoal-900 p-8 text-center text-cream-50 sm:p-10">
            <h2 className="font-serif text-2xl sm:text-3xl">{post.cta.heading}</h2>
            <p className="mx-auto mt-3 max-w-xl text-cream-200">{post.cta.body}</p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              {post.cta.primary.href.endsWith(".pdf") ? (
                <a
                  href={post.cta.primary.href}
                  download
                  className="inline-flex items-center justify-center rounded-full bg-clay-300 px-7 py-3 text-sm font-bold text-charcoal-900 transition hover:bg-clay-200"
                >
                  {post.cta.primary.label}
                </a>
              ) : (
                <Link
                  href={post.cta.primary.href}
                  className="inline-flex items-center justify-center rounded-full bg-clay-300 px-7 py-3 text-sm font-bold text-charcoal-900 transition hover:bg-clay-200"
                >
                  {post.cta.primary.label}
                </Link>
              )}
              {post.cta.secondary && (
                <Link
                  href={post.cta.secondary.href}
                  className="inline-flex items-center justify-center rounded-full border-2 border-clay-300 px-7 py-3 text-sm font-bold text-clay-300 transition hover:bg-charcoal-800"
                >
                  {post.cta.secondary.label}
                </Link>
              )}
            </div>
            {post.cta.fineNote && <p className="mt-4 text-xs text-charcoal-400">{post.cta.fineNote}</p>}
          </div>
        )}

        {post.disclaimer && (
          <p className="mt-10 border-t border-charcoal-100 pt-4 text-xs italic text-charcoal-500">
            {post.disclaimer}
          </p>
        )}
      </Container>

      {post.faq && post.faq.length > 0 && (
        <div id="faq" className="scroll-mt-24">
          <FaqSection items={post.faq} />
        </div>
      )}

      <JsonLd data={getBlogPostSchema(post)} />
    </main>
  );
}
