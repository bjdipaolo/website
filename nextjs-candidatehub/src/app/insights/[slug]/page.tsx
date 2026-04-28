import { client } from "@/sanity/client";
import { PortableText } from "@portabletext/react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Define the components for PortableText to match the brand styling
const portableTextComponents = {
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl font-bold mt-12 mb-6">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-bold mt-10 mb-5">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-bold mt-8 mb-4">{children}</h3>,
    normal: ({ children }: any) => <p className="mb-6 text-lg text-zinc-300 leading-relaxed">{children}</p>,
    blockquote: ({ children }: any) => <blockquote className="border-l-4 border-[#F26430] pl-4 italic text-zinc-400 my-6">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-6 text-zinc-300 space-y-2 text-lg">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-6 mb-6 text-zinc-300 space-y-2 text-lg">{children}</ol>,
  },
  marks: {
    link: ({ children, value }: any) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a href={value?.href} className="text-[#F26430] hover:underline" target={target} rel={target === '_blank' ? 'noindex nofollow' : ''}>
          {children}
        </a>
      );
    },
  },
};

async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    title,
    publishedAt,
    body
  }`;
  const data = await client.fetch(query, { slug });
  return data;
}

export default async function InsightPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/insights" className="text-[#F26430] hover:underline mb-8 inline-block">
          &larr; Back to Insights
        </Link>
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
          <time className="text-zinc-400">
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </header>
        <div className="prose prose-invert max-w-none">
          {post.body ? (
            <PortableText value={post.body} components={portableTextComponents} />
          ) : (
            <p className="text-zinc-400 italic">This post has no content.</p>
          )}
        </div>
      </div>
    </div>
  );
}
