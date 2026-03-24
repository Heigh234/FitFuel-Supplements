export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="w-10 h-1 bg-brand-orange rounded-full" aria-hidden="true" />
      <h2 className="font-display text-3xl md:text-4xl tracking-widest text-brand-text uppercase">
        {children}
      </h2>
    </div>
  );
}
