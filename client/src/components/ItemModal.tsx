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
    Pencil,
    Trash2,
    CheckCircle,
    CircleXIcon,
    Loader2,
} from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import ItemForm from "./ItemForm";

export default function ItemModal({
    item,
    isOpen,
    onClose,
    onRefresh,
}: {
    item: any;
    isOpen: boolean;
    onClose: () => void;
    onRefresh: () => void;
}) {
    if (!item) return null;

    const [isEditing, setIsEditing] = useState(false);
    const images = item.images || [];
    const [index, setIndex] = useState(0);
    const { user } = useAuth();
    const [isProcessing, setIsProcessing] = useState(false);
    const isOwner = user?._id === item.postedBy?._id;
    const hasImages = images.length > 0;

    const handleDelete = async () => {
        if (
            !window.confirm(
                "Are you sure you want to delete this report permanently?",
            )
        )
            return;

        setIsProcessing(true);
        try {
            await api.delete(`/items/${item._id}`);
            toast.success("Report deleted successfully");
            onClose();
            onRefresh();
        } catch (error) {
            toast.error("Failed to delete the report");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleStatusUpdate = async () => {
        const newStatus =
            item.status === "Resolved" ? "Unresolved" : "Resolved";
        setIsProcessing(true);
        try {
            await api.put(`/items/${item._id}`, { status: newStatus });
            toast.success(`Item marked as ${newStatus}`);
            onClose();
            onRefresh();
        } catch (error) {
            toast.error("Failed to update status");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleContact = () => {
        const method = item.contactPreference?.method;
        const value = item.contactPreference?.value;

        if (!value) return;

        switch (method) {
            case "Social Media":
                const url = value.startsWith("http")
                    ? value
                    : `https://${value}`;
                window.open(url, "_blank", "noopener,noreferrer");
                break;

            case "Email":
                window.location.href = `mailto:${value}?subject=Regarding your post on Lost & Found: ${item.title}`;
                break;

            case "Phone":
                navigator.clipboard.writeText(value);
                toast("Copied to Clipboard!", {
                    description: (
                        <span className="text-primary font-medium">
                            {value} has been copied to your clipboard.
                        </span>
                    ),
                });
                break;
            default:
                console.warn("Unknown contact method");
                break;
        }
    };

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
                {isEditing ? (
                    <div className="flex-1 overflow-y-auto p-6">
                        <ItemForm
                            initialData={item}
                            onRefresh={() => {
                                onRefresh();
                                setIsEditing(false);
                                onClose();
                            }}
                            onCancel={() => setIsEditing(false)}
                        />
                    </div>
                ) : (
                    <>
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
                                                    {index + 1} /{" "}
                                                    {images.length}
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
                                    {item.location?.coordinates?.lat ? (
                                        <a
                                            href={`https://www.google.com/maps/search/?api=1&query=${item.location.coordinates.lat},${item.location.coordinates.lng}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="truncate hover:underline cursor-pointer"
                                        >
                                            {item.location?.name}
                                        </a>
                                    ) : (
                                        <span className="truncate">
                                            {item.location?.name ||
                                                "Unknown Location"}
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 shrink-0" />
                                    {item.postedBy?.name || "User"}
                                </div>

                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 shrink-0" />
                                    {new Date(
                                        item.createdAt,
                                    ).toLocaleDateString()}
                                </div>
                            </div>

                            {/* CONTACT */}
                            <div className="bg-primary/10 p-4 rounded-lg border border-primary/20">
                                <h4 className="text-sm font-semibold text-primary mb-2">
                                    Contact Information
                                </h4>

                                <div className="space-y-2 text-sm text-primary/90">
                                    <div className="flex items-center gap-2 overflow-hidden">
                                        <MessageCircle className="h-4 w-4 shrink-0" />
                                        {item.contactPreference?.value}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {/* FOOTER */}
                <DialogFooter className="p-6 pt-0 border-t border-border mt-6">
                    {isOwner && !isEditing ? (
                        <div className="flex flex-col w-full gap-4 pt-4">
                            <div className="flex flex-wrap items-center gap-2 w-full">
                                <Button
                                    variant="outline"
                                    className="flex-1 min-w-20"
                                    onClick={() => setIsEditing(true)}
                                    disabled={isProcessing}
                                >
                                    <Pencil className="mr-2 h-3.5 w-3.5" /> Edit
                                </Button>

                                <Button
                                    variant="secondary"
                                    className={`flex-1 min-w-30 ${
                                        item.status !== "Resolved"
                                            ? "bg-found/15 text-found border-none"
                                            : ""
                                    }`}
                                    onClick={handleStatusUpdate}
                                    disabled={isProcessing}
                                >
                                    {item.status === "Resolved" ? (
                                        <>
                                            <CircleXIcon className="mr-2 h-3.5 w-3.5" />{" "}
                                            Unresolve
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="mr-2 h-3.5 w-3.5" />{" "}
                                            Resolve
                                        </>
                                    )}
                                </Button>

                                <Button
                                    variant="destructive"
                                    className="flex-1 min-w-35"
                                    onClick={handleDelete}
                                    disabled={isProcessing}
                                >
                                    {isProcessing ? (
                                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                    ) : (
                                        <>
                                            <Trash2 className="mr-2 h-3.5 w-3.5" />{" "}
                                            Delete
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    ) : (
                        !isEditing && (
                            <div className="flex items-center gap-3 w-full justify-end pt-4">
                                <Button
                                    variant="outline"
                                    onClick={onClose}
                                    className="border-border text-foreground"
                                >
                                    Close
                                </Button>
                                <Button
                                    onClick={handleContact}
                                    className="bg-primary text-primary-foreground hover:opacity-90 px-8"
                                >
                                    Contact Poster
                                </Button>
                            </div>
                        )
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
