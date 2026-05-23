export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col bg-surface-card rounded-2xl overflow-hidden border border-border-subtle animate-pulse">
      <div className="aspect-square bg-surface-secondary" />
      <div className="flex flex-col p-3 gap-3">
        <div className="h-3 bg-surface-secondary rounded-full w-full" />
        <div className="h-3 bg-surface-secondary rounded-full w-3/4" />
        <div className="h-4 bg-surface-input rounded-full w-1/3 mt-1" />
        <div className="h-9 bg-surface-input rounded-[9px] mt-1" />
      </div>
    </div>
  )
}
