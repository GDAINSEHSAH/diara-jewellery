import Image from "next/image";

interface CollectionCardProps {
  title: string;
  description: string;
  imageColor: string;
  image?: string;
  onViewClick: () => void;
}

export default function CollectionCard({
  title,
  description,
  imageColor,
  image,
  onViewClick,
}: CollectionCardProps) {
  return (
    <div className="group cursor-pointer transform hover:scale-[1.02] transition-transform duration-500" onClick={onViewClick}>
      <div
        className={`aspect-[3/4] bg-gradient-to-br ${imageColor} rounded-sm mb-6 overflow-hidden relative shadow-xl group-hover:shadow-2xl transition-all duration-500 border border-slate-200/20`}
      >
        {/* Real jewellery image */}
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}

        {/* Premium border effect with gradient */}
        <div className="absolute inset-4 border-2 border-white/0 group-hover:border-white/30 rounded-sm transition-all duration-500" />

        {/* Silver shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent translate-x-[-100%] translate-y-[-100%] group-hover:translate-x-[100%] group-hover:translate-y-[100%] transition-transform duration-1000" />

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <span className="text-stone-700 text-sm font-medium tracking-wide bg-white/80 px-4 py-1.5 rounded-full backdrop-blur-sm inline-block">
              View Lookbook
            </span>
          </div>
        </div>
      </div>
      <h3 className="font-playfair text-xl md:text-2xl text-stone-800 mb-2">
        {title}
      </h3>
      <p className="text-stone-600 text-sm leading-relaxed mb-4">
        {description}
      </p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onViewClick();
        }}
        className="text-stone-700 text-sm font-medium tracking-wide hover:text-stone-900 transition-colors inline-flex items-center group/link"
      >
        View Lookbook
        <svg
          className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
