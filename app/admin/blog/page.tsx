import { prisma } from "@/lib/prisma";
import { BlogClient } from "@/components/admin/blog-client";
export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-[var(--text)]">Blog Posts</h1>
        <p className="text-[var(--muted)] mt-1">Manage your content</p>
      </div>
      <BlogClient data={posts} />
    </div>
  );
}
