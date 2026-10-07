import Image from "next/image";
import { placeholderImageDataUri } from "@/lib/placeholder-image";

type ProjectImageProps = {
  src?: string;
  alt: string;
  label: string;
  className?: string;
};

const SIZES = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";

// Renders a real photo through next/image (automatic format/size
// optimization + lazy loading) once `src` is set in content/projects.ts.
// Until then, falls back to a generated placeholder graphic rendered as a
// plain <img> — next/image's optimizer doesn't support data: URIs, and
// there's nothing to optimize in an inline SVG anyway. Either way the image
// carries real, SEO- and AEO-relevant alt text.
export function ProjectImage({ src, alt, label, className = "" }: ProjectImageProps) {
  if (src) {
    return (
      <div className={`relative aspect-[4/3] w-full overflow-hidden rounded-xl ${className}`}>
        <Image src={src} alt={alt} fill sizes={SIZES} loading="lazy" className="object-cover" />
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- generated data: URI placeholder, not eligible for next/image optimization
    <img
      src={placeholderImageDataUri({ label })}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={`aspect-[4/3] w-full rounded-xl object-cover ${className}`}
    />
  );
}
