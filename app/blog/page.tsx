"use client";

import { useState } from "react";
import { blogPosts, blogCategories } from "@/data/blog";
import BlogCard from "@/components/BlogCard";

const categories = [
  { key: "all", label: "All Posts" },
  ...Object.entries(blogCategories).map(([key, label]) => ({ key, label })),
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <div className="h-20" />

      {/* Hero */}
      <div className="bg-gradient-to-b from-stone-100 to-[#FDFBF7] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="font-playfair text-4xl md:text-5xl text-stone-800 mb-4">
            The DIARA Journal
          </h1>
          <p className="text-stone-500 max-w-2xl mx-auto leading-relaxed">
            Stories, styling tips, and behind-the-scenes glimpses into the world of silver jewellery
          </p>
        </div>
      </div>

      {/* Category Filters */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.key
                  ? "bg-stone-800 text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-stone-500">No posts found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
