import { ImgHTMLAttributes } from "react";

interface ResponsiveImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
}

export default function ResponsiveImage({
  src,
  alt,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  priority = false,
  className,
  ...props
}: ResponsiveImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      sizes={sizes}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      {...props}
    />
  );
}
