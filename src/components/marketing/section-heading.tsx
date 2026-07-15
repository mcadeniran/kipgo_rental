interface Props {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  center = true,
}: Props) {
  return (
    <div
      className={
        center
          ? "mx-auto mb-12 max-w-3xl text-center"
          : "mb-12"
      }
    >
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
}