type Props = {
  title: string;
  excerpt: string;
  image: string;
  href: string;
  date: string;
  location: string;
  tags?: string[];
};

export default function ActivityCard({
  title,
  excerpt,
  image,
  href,
  date,
  location,
  tags,
}: Props) {
  return (
    <a
      href={href}
      class="group block overflow-hidden rounded-xl border border-border bg-bg transition hover:shadow-lg"
    >
      <img
        src={image}
        alt={title}
        class="h-56 w-full object-cover"
        loading="lazy"
      />

      <div class="p-5">
        <h3 class="text-lg font-semibold group-hover:text-primary">
          {title}
        </h3>

        <p class="mt-2 text-sm text-text-secondary">
          {excerpt}
        </p>

        <div class="mt-3 flex flex-wrap gap-2 text-xs text-text-secondary">
          <span>{date}</span>
          <span>• {location}</span>
        </div>

        {tags && (
          <div class="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span class="rounded bg-bg-muted px-2 py-1 text-xs">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}
