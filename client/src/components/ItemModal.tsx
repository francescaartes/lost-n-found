import { useState } from "react";
import {
    MapPin,
    Calendar,
    User,
    MessageCircle,
    ChevronLeft,
    ChevronRight,
    Image,
    Bookmark,
} from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export default function ItemModal({
    item,
    isOpen,
    onClose,
}: {
    item: any;
    isOpen: boolean;
    onClose: () => void;
}) {
    const images = item.images || [];
    const [index, setIndex] = useState(0);

    if (!item) return null;

    const hasImages = images.length > 0;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                className="
                    sm:max-w-195
                    max-h-[85vh]
                    overflow-hidden
                    p-0
                    flex flex-col
                    bg-background
                "
            >
                {/* HEADER */}
                <div className="px-6 pt-6 pb-3 border-b border-border space-y-2">
                    <div className="pr-8">
                        <DialogTitle className="text-xl font-semibold leading-snug text-foreground">
                            {item.title}
                        </DialogTitle>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                        <span
                            className={`text-xs font-bold px-2 py-1 rounded-md ${
                                item.type === "Lost"
                                    ? "bg-lost/15 text-lost"
                                    : "bg-found/15 text-found"
                            }`}
                        >
                            {item.type}
                        </span>

                        {/* STATUS BADGE */}
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

                    {/* META */}
                    <DialogDescription className="text-sm text-muted-foreground">
                        Posted on{" "}
                        {new Date(item.createdAt).toLocaleDateString()}
                    </DialogDescription>
                </div>

                <div className="p-6 space-y-6 overflow-y-auto flex-1">
                    {/* IMAGES */}
                    <div className="relative w-full h-72 sm:h-80 bg-muted/50 rounded-lg overflow-hidden border border-border">
                        {hasImages ? (
                            <>
                                <img
                                    src={images[index]}
                                    className="w-full h-full object-cover"
                                />

                                {images.length > 1 && (
                                    <>
                                        <button
                                            onClick={() =>
                                                setIndex(
                                                    (prev) =>
                                                        (prev -
                                                            1 +
                                                            images.length) %
                                                        images.length,
                                                )
                                            }
                                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-colors"
                                        >
                                            <ChevronLeft size={18} />
                                        </button>

                                        <button
                                            onClick={() =>
                                                setIndex(
                                                    (prev) =>
                                                        (prev + 1) %
                                                        images.length,
                                                )
                                            }
                                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-colors"
                                        >
                                            <ChevronRight size={18} />
                                        </button>

                                        <div className="absolute bottom-2 right-2 text-xs text-white bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
                                            {index + 1} / {images.length}
                                        </div>
                                    </>
                                )}
                            </>
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground text-sm gap-2">
                                <Image className="h-6 w-6 opacity-50" />
                                No images available
                            </div>
                        )}
                    </div>

                    {/* DESCRIPTION */}
                    <div>
                        <h4 className="text-sm font-semibold text-foreground mb-2">
                            Description
                        </h4>
                        <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-md border border-border">
                            {item.description}
                        </p>
                    </div>

                    {/* META */}
                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Bookmark className="h-4 w-4 shrink-0" />
                            {item.category}
                        </div>

                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 shrink-0" />
                            <span className="truncate">
                                {item.location?.name}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4 shrink-0" />
                            Anonymous User
                        </div>

                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 shrink-0" />
                            {new Date(item.createdAt).toLocaleDateString()}
                        </div>
                    </div>

                    {/* CONTACT */}
                    <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                        <h4 className="text-sm font-semibold text-primary mb-2">
                            Contact Information
                        </h4>

                        <div className="space-y-2 text-sm text-primary/90">
                            <div className="flex items-center gap-2">
                                <MessageCircle className="h-4 w-4 shrink-0" />
                                hidden@email.com
                            </div>
                        </div>
                    </div>
                </div>

                {/* FOOTER */}
                <DialogFooter className="p-6 pt-0 flex justify-between border-t border-border">
                    <div className="mt-4 flex gap-2 w-full justify-between sm:justify-end">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            className="border-border text-foreground"
                        >
                            Close
                        </Button>
                        <Button className="bg-primary text-primary-foreground hover:opacity-90">
                            Contact Poster
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
