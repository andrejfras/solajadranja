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
      className={`group relative block rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up animate-delay-${index + 1}`}
    >
      {/* Image with overlay */}
      <div className="relative h-[260px] overflow-hidden">
        <Image
          src={image}
          alt={name}
          width={600}
          height={260}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Price badge */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-navy font-bold text-sm px-3 py-1.5 rounded-full shadow-lg">
          {priceLabel}
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-white text-xl font-bold mb-1 drop-shadow-lg">{name}</h3>
          <p className="text-white/80 text-sm leading-relaxed">{shortDescription}</p>
        </div>
      </div>

      {/* Bottom action hint */}
      <div className="px-5 py-3 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white">
        <span className="text-sm text-ocean font-medium">Več o tečaju</span>
        <span className="text-ocean group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
      </div>
    </Link>
  );
}
