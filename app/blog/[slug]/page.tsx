"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { blogPosts, blogCategories } from "@/data/blog";
import BlogCard from "@/components/BlogCard";
import BlogShareButtons from "@/components/BlogShareButtons";

export default function BlogPostPage() {
  const params = useParams();
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-playfair text-3xl text-stone-800 mb-4">Post Not Found</h1>
          <p className="text-stone-500 mb-6">The article you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/blog"
            className="px-6 py-3 bg-stone-800 text-white rounded-full hover:bg-stone-700 transition-colors"
          >
            Browse Journal
          </Link>
        </div>
      </div>
    );
  }

  const related = post.relatedPosts
    .map((id) => blogPosts.find((p) => p.id === id))
    .filter(Boolean) as typeof blogPosts;

  // Convert markdown-like content to HTML-like paragraphs
  const renderContent = (content: string) => {
    return content.split("\n\n").map((block, i) => {
      if (block.startsWith("**") && block.endsWith("**")) {
        return (
          <h3
            key={i}
            className="font-playfair text-xl text-stone-800 mt-8 mb-3"
          >
            {block.replace(/\*\*/g, "")}
          </h3>
        );
      }
      if (block.startsWith("*") && !block.startsWith("**")) {
        return (
          <p key={i} className="text-stone-600 leading-relaxed italic mb-4">
            {block.replace(/\*/g, "")}
          </p>
        );
      }
      if (block.startsWith("- ")) {
        const items = block.split("\n").filter((l) => l.startsWith("- "));
        return (
          <ul key={i} className="list-disc list-inside space-y-2 mb-4 text-stone-600">
            {items.map((item, j) => (
              <li key={j}>{item.replace(/^- /, "")}</li>
            ))}
          </ul>
        );
      }
      // Handle headings within paragraphs
      const parts = block.split(/(\*\*[^*]+\*\*)/g);
      return (
        <p key={i} className="text-stone-600 leading-relaxed mb-4">
          {parts.map((part, j) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={j} className="text-stone-800">
                  {part.replace(/\*\*/g, "")}
                </strong>
              );
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <div className="h-20" />

      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 pt-8">
        <nav className="flex items-center gap-2 text-sm text-stone-400">
          <Link href="/" className="hover:text-stone-600 transition-colors">Home</Link>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/blog" className="hover:text-stone-600 transition-colors">Journal</Link>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-stone-600 truncate max-w-[200px]">{post.title}</span>
        </nav>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <span className="inline-block px-3 py-1 bg-stone-100 text-stone-600 text-xs font-medium rounded-full mb-4">
            {blogCategories[post.category]}
          </span>
          <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-stone-800 mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-stone-400">
            <span>{post.author}</span>
            <span className="w-1 h-1 bg-stone-300 rounded-full" />
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            <span className="w-1 h-1 bg-stone-300 rounded-full" />
            <span>{post.readTime} min read</span>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-stone-100 mb-10">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 800px"
            priority
          />
        </div>

        {/* Content */}
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-stone-700 leading-relaxed mb-6 font-medium">
            {post.excerpt}
          </p>
          <div className="border-t border-stone-100 pt-6">
            {renderContent(post.content)}
          </div>
        </div>

        {/* Tags + Share */}
        <div className="max-w-3xl mx-auto mt-12 pt-8 border-t border-stone-100">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-stone-100 text-stone-500 text-xs rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <BlogShareButtons title={post.title} slug={post.slug} />
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {related.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
          <div className="border-t border-stone-100 pt-16">
            <h2 className="font-playfair text-2xl md:text-3xl text-stone-800 text-center mb-2">
              You Might Also Enjoy
            </h2>
            <p className="text-stone-400 text-center mb-10">
              More from the DIARA Journal
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {related.map((relPost) => (
                <BlogCard key={relPost.id} post={relPost} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
