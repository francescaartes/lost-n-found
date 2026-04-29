import { DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function ItemHeader({
    item,
    inModal = false,
}: {
    item: any;
    inModal?: boolean;
}) {
    const TitleTag = inModal ? DialogTitle : "h1";
    const DescTag = inModal ? DialogDescription : "p";

    return (
        <div className="space-y-2">
            {/* Title */}
            <div className="pr-8">
                <TitleTag
                    className={
                        inModal
                            ? "text-xl font-semibold leading-snug text-foreground"
                            : "text-2xl font-bold tracking-tight text-foreground"
                    }
                >
                    {item.title}
                </TitleTag>
            </div>

            <div className="flex items-center justify-between gap-4 flex-wrap">
                <DescTag className="text-sm text-muted-foreground">
                    Posted on {new Date(item.createdAt).toLocaleDateString()}
                </DescTag>

                <div className="flex items-center gap-2">
                    <span
                        className={`text-xs font-bold px-2 py-1 rounded-md ${
                            item.type === "Lost"
                                ? "bg-lost/15 text-lost"
                                : "bg-found/15 text-found"
                        }`}
                    >
                        {item.type}
                    </span>

                    <span
                        className={`text-xs font-medium px-2 py-1 rounded-md ${
                            item.status === "Resolved"
                                ? "bg-found/15 text-found"
                                : "bg-destructive/15 text-destructive"
                        }`}
                    >
                        {item.status || "Unresolved"}
                    </span>
                </div>
            </div>
        </div>
    );
}
