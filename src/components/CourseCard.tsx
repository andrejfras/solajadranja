import Link from "next/link";
import Image from "next/image";

interface Props {
  slug: string;
  name: string;
  shortDescription: string;
  image: string;
  priceLabel: string;
  index: number;
}

export default function CourseCard({ slug, name, shortDescription, image, priceLabel, index }: Props) {
  return (
    <Link
      href={`/courses/${slug}`}
      className={`group relative block rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up animate-delay-${index + 1}`}
    >
      {/* Full height image */}
      <div className="relative h-[380px] w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Soft, deep gradient for elegant text overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Price badge - Glassmorphic top right */}
        <div className="absolute top-5 right-5 bg-white/10 backdrop-blur-md text-white font-medium text-sm px-4 py-2 rounded-md shadow-lg border border-white/20">
          {priceLabel}
        </div>

        {/* Content overlay bottom left */}
        <div className="absolute bottom-0 left-0 right-0 p-8 flex border-t border-transparent group-hover:border-white/10 transition-colors duration-500">
          <div className="flex-1">
            <h3 className="text-white text-2xl font-display mb-2 drop-shadow-md">{name}</h3>
            <p className="text-white/80 text-sm leading-relaxed font-light line-clamp-2 pr-4">{shortDescription}</p>
          </div>
          <div className="flex items-end self-end shrink-0">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 text-white group-hover:bg-coral group-hover:border-coral transition-colors duration-300">
              <span className="group-hover:translate-x-0.5 transition-transform duration-300">&rarr;</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
