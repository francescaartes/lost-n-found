import { useState } from "react";
import { toast } from "sonner";
import api from "@/lib/api";

export function useItemActions(
    item: any,
    callbacks?: {
        onDeleteSuccess?: () => void;
        onUpdateSuccess?: () => void;
        onClose?: () => void;
    },
) {
    const [isProcessing, setIsProcessing] = useState(false);

    const handleDelete = async () => {
        setIsProcessing(true);
        try {
            await api.delete(`/items/${item._id}`);
            toast.success("Report deleted successfully");

            if (callbacks?.onClose) callbacks.onClose();
            if (callbacks?.onDeleteSuccess) callbacks.onDeleteSuccess();
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

            if (callbacks?.onUpdateSuccess) callbacks.onUpdateSuccess();
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
                toast.success("Copied to Clipboard!");
                break;
            default:
                console.warn("Unknown contact method");
                break;
        }
    };

    return {
        isProcessing,
        handleDelete,
        handleStatusUpdate,
        handleContact,
    };
}
