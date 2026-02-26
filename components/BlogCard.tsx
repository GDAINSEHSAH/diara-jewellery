"use client";

import Image from "next/image";
import Link from "next/link";
import { BlogPost, blogCategories } from "@/data/blog";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="bg-white rounded-2xl overflow-hidden border border-stone-100 hover:border-stone-200 hover:shadow-xl transition-all duration-500">
        <div className="relative aspect-[16/10] overflow-hidden bg-stone-50">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-stone-700 text-xs font-medium rounded-full">
              {blogCategories[post.category]}
            </span>
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-3 text-xs text-stone-400 mb-3">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </time>
            <span className="w-1 h-1 bg-stone-300 rounded-full" />
            <span>{post.readTime} min read</span>
          </div>
          <h3 className="font-playfair text-lg text-stone-800 group-hover:text-stone-600 transition-colors mb-2 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-stone-500 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm font-medium text-stone-600 group-hover:text-stone-800 transition-colors">
            Read More
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}
