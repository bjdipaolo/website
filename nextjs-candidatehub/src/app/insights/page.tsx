import { client } from "@/sanity/client";
import Link from "next/link";

async function getInsights() {
  const query = `*[_type == "post" && slug.current != "to-delete"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function InsightsPage() {
  const posts = await getInsights();

  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-12">Insights</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any) => (
            <Link 
              key={post._id} 
              href={`/insights/${post.slug}`}
              className="block bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-[#F26430] transition-colors group"
            >
              <h2 className="text-xl font-semibold mb-4 group-hover:text-[#F26430] transition-colors">{post.title}</h2>
              <time className="text-sm text-zinc-400">
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
