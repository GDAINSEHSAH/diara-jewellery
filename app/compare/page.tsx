"use client";

import Image from "next/image";
import Link from "next/link";
import { useCompare } from "@/context/CompareContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { categoryLabels, typeLabels } from "@/data/products";

export default function ComparePage() {
  const { items, removeFromCompare } = useCompare();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();

  if (items.length < 2) {
    return (
      <div className="min-h-screen bg-[#FDFBF7]">
        <div className="h-20" />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-20 text-center">
          <svg
            className="w-16 h-16 text-stone-300 mx-auto mb-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h1 className="font-playfair text-3xl text-stone-800 mb-4">Compare Products</h1>
          <p className="text-stone-500 mb-8">
            Add at least 2 products to compare. You can add up to 3 products.
          </p>
          <Link
            href="/products"
            className="px-8 py-3 bg-stone-800 text-white font-medium rounded-full hover:bg-stone-700 transition-colors text-sm"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const rows = [
    { label: "Image", key: "image" },
    { label: "Name", key: "name" },
    { label: "Price", key: "price" },
    { label: "Category", key: "category" },
    { label: "Type", key: "type" },
    { label: "Material", key: "material" },
    { label: "Rating", key: "rating" },
    { label: "In Stock", key: "inStock" },
    { label: "Actions", key: "actions" },
  ] as const;

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <div className="h-20" />

      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-10">
        <h1 className="font-playfair text-3xl md:text-4xl text-stone-800 mb-2 text-center">
          Compare Products
        </h1>
        <p className="text-stone-400 text-center mb-10">
          Side-by-side comparison of your selected pieces
        </p>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody>
                {rows.map((row) => (
                  <tr key={row.key} className="border-b border-stone-50 last:border-0">
                    <td className="px-6 py-4 text-sm font-medium text-stone-500 bg-stone-50/50 w-32 whitespace-nowrap">
                      {row.label}
                    </td>
                    {items.map((product) => (
                      <td key={product.id} className="px-6 py-4 text-center">
                        {row.key === "image" && (
                          <div className="relative">
                            <Link href={`/products/${product.id}`}>
                              <div className="relative w-32 h-32 mx-auto rounded-xl overflow-hidden bg-stone-50">
                                <Image
                                  src={product.images[0]}
                                  alt={product.name}
                                  fill
                                  className="object-cover hover:scale-105 transition-transform"
                                  sizes="128px"
                                />
                              </div>
                            </Link>
                            <button
                              onClick={() => removeFromCompare(product.id)}
                              className="absolute -top-2 -right-2 w-6 h-6 bg-stone-200 text-stone-600 rounded-full flex items-center justify-center hover:bg-stone-300 transition-colors"
                              aria-label="Remove from compare"
                            >
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        )}
                        {row.key === "name" && (
                          <Link
                            href={`/products/${product.id}`}
                            className="font-medium text-stone-800 hover:text-stone-600 transition-colors"
                          >
                            {product.name}
                          </Link>
                        )}
                        {row.key === "price" && (
                          <div>
                            <span className="text-lg font-semibold text-stone-800">
                              ₹{product.price.toLocaleString("en-IN")}
                            </span>
                            {product.originalPrice && (
                              <span className="text-sm text-stone-400 line-through ml-2">
                                ₹{product.originalPrice.toLocaleString("en-IN")}
                              </span>
                            )}
                          </div>
                        )}
                        {row.key === "category" && (
                          <span className="text-sm text-stone-600">
                            {categoryLabels[product.category]}
                          </span>
                        )}
                        {row.key === "type" && (
                          <span className="text-sm text-stone-600">
                            {typeLabels[product.type]}
                          </span>
                        )}
                        {row.key === "material" && (
                          <span className="text-sm text-stone-600">{product.material}</span>
                        )}
                        {row.key === "rating" && (
                          <div className="flex items-center justify-center gap-1.5">
                            <div className="flex items-center">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-amber-400" : "text-stone-200"}`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="text-xs text-stone-400">
                              {product.rating} ({product.reviews})
                            </span>
                          </div>
                        )}
                        {row.key === "inStock" && (
                          <span
                            className={`inline-flex items-center gap-1.5 text-sm font-medium ${
                              product.inStock ? "text-emerald-600" : "text-red-500"
                            }`}
                          >
                            <span
                              className={`w-2 h-2 rounded-full ${
                                product.inStock ? "bg-emerald-500" : "bg-red-500"
                              }`}
                            />
                            {product.inStock ? "In Stock" : "Out of Stock"}
                          </span>
                        )}
                        {row.key === "actions" && (
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => {
                                addToCart(product);
                                addToast("success", `Added ${product.name} to bag`);
                              }}
                              className="px-4 py-2 bg-stone-800 text-white text-sm font-medium rounded-full hover:bg-stone-700 transition-colors"
                            >
                              Add to Bag
                            </button>
                            <button
                              onClick={() => {
                                toggleWishlist(product);
                                addToast(
                                  "success",
                                  isInWishlist(product.id)
                                    ? `Removed ${product.name} from wishlist`
                                    : `Saved ${product.name} to wishlist`
                                );
                              }}
                              className="px-4 py-2 border border-stone-200 text-stone-600 text-sm rounded-full hover:bg-stone-50 transition-colors"
                            >
                              {isInWishlist(product.id) ? "In Wishlist" : "Add to Wishlist"}
                            </button>
                          </div>
                        )}
                      </td>
                    ))}
                    {/* Empty columns if < 3 items */}
                    {items.length < 3 && (
                      <td className="px-6 py-4 text-center">
                        {row.key === "image" ? (
                          <Link
                            href="/products"
                            className="w-32 h-32 mx-auto rounded-xl border-2 border-dashed border-stone-200 flex items-center justify-center hover:border-stone-300 transition-colors"
                          >
                            <div className="text-center">
                              <svg className="w-6 h-6 text-stone-300 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                              <span className="text-xs text-stone-400">Add</span>
                            </div>
                          </Link>
                        ) : null}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
