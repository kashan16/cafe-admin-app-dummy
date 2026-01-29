export default function SkeletonCard() {
    return (
        <div className="rounded-xl border border-border bg-muted/40 p-4 animate-pulse">
            <div className="h-5 bg-muted rounded w-1/2 mb-3" />
            <div className="h-3 bg-muted rounded w-1/4 mb-4" />
            <div className="grid grid-cols-2 gap-3">
                <div className="h-6 bg-muted rounded" />
                <div className="h-6 bg-muted rounded" />
            </div>
            <div className="h-3 bg-muted rounded mt-4" />
        </div>
    );
}