import { useItems } from "@/hooks/useItems";
import ItemCard from "./ItemCard";
import { Loader2, Inbox } from "lucide-react";

interface ItemFeedProps {
    scope: "all" | "my-reports";
    emptyMessage?: string;
}

export default function ItemFeed({ scope, emptyMessage }: ItemFeedProps) {
    const { items, loading, error } = useItems(scope);

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error)
        return <div className="text-destructive p-4 text-center">{error}</div>;

    if (items.length === 0) {
        return (
            <div className="text-center py-20 border-2 border-dashed rounded-xl">
                <Inbox className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground">
                    {emptyMessage || "No items found."}
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-4">
            {items.map((item: any) => (
                <ItemCard key={item._id} item={item} />
            ))}
        </div>
    );
}
