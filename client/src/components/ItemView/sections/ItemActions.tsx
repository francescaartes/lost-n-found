import { Button } from "@/components/ui/button";
import {
    Pencil,
    Trash2,
    CheckCircle,
    CircleXIcon,
    Loader2,
} from "lucide-react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type ItemActionsProps = {
    item: any;
    isOwner: boolean;
    isProcessing: boolean;
    onEdit: () => void;
    onToggleStatus: () => void;
    onDelete: () => void;
    onContact: () => void;
    onClose?: () => void;
};

export default function ItemActions({
    item,
    isOwner,
    isProcessing,
    onEdit,
    onToggleStatus,
    onDelete,
    onContact,
    onClose,
}: ItemActionsProps) {
    if (isOwner) {
        return (
            <div className="flex flex-wrap items-center gap-2 w-full pt-4">
                <Button
                    variant="outline"
                    className="flex-1 min-w-20"
                    onClick={onEdit}
                    disabled={isProcessing}
                >
                    <Pencil className="mr-2 h-3.5 w-3.5" /> Edit
                </Button>

                <Button
                    variant="secondary"
                    className={`flex-1 min-w-30 ${item.status !== "Resolved" ? "bg-found/15 text-found border-none" : ""}`}
                    onClick={onToggleStatus}
                    disabled={isProcessing}
                >
                    {item.status === "Resolved" ? (
                        <>
                            <CircleXIcon className="mr-2 h-3.5 w-3.5" />{" "}
                            Unresolve
                        </>
                    ) : (
                        <>
                            <CheckCircle className="mr-2 h-3.5 w-3.5" /> Resolve
                        </>
                    )}
                </Button>

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="destructive"
                            className="flex-1 min-w-35"
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
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This will permanently delete the report for "
                                {item.title}". This action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={onDelete}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                                Delete Permanently
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-3 w-full justify-end pt-4">
            {onClose && (
                <Button
                    variant="outline"
                    onClick={onClose}
                    className="border-border text-foreground"
                >
                    Close
                </Button>
            )}

            <Button
                onClick={onContact}
                className="bg-primary text-primary-foreground hover:opacity-90 px-8"
            >
                Contact Poster
            </Button>
        </div>
    );
}
