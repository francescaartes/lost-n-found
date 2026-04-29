import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Maximize2 } from "lucide-react";

import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";

import { useAuth } from "@/context/AuthContext";
import ItemForm from "./ReportForm/ItemForm";
import ItemHeader from "./ItemView/sections/ItemHeader";
import ItemView from "./ItemView/ItemView";

import { useItemActions } from "@/hooks/useItemActions";
import ItemActions from "./ItemView/sections/ItemActions";

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
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const { user } = useAuth();
    console.log(item);

    const { isProcessing, handleDelete, handleStatusUpdate, handleContact } =
        useItemActions(item, {
            onDeleteSuccess: () => {
                onRefresh();
                onClose();
            },

            onUpdateSuccess: () => {
                onRefresh();
                onClose();
            },
        });

    if (!item) return null;

    const isOwner = user?._id === item.postedBy?._id;

    const handleViewFullPage = () => {
        onClose();
        navigate(`/report/${item._id}`);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-195 max-h-[85vh] overflow-hidden p-0 flex flex-col bg-background">
                <button
                    onClick={handleViewFullPage}
                    className="absolute right-13 top-4 rounded-full p-2 opacity-70 bg-accent "
                    title="View post"
                >
                    <Maximize2 className="h-4 w-4" />
                    <span className="sr-only">View post</span>
                </button>
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
                        <div className="px-6 pt-6 pb-3 border-b border-border">
                            <ItemHeader item={item} inModal={true} />
                        </div>

                        <div className="p-6 overflow-y-auto flex-1">
                            <ItemView item={item} />
                        </div>

                        <DialogFooter className="p-6 pt-0 border-t border-border mt-6">
                            <ItemActions
                                item={item}
                                isOwner={isOwner}
                                isProcessing={isProcessing}
                                onEdit={() => setIsEditing(true)}
                                onToggleStatus={handleStatusUpdate}
                                onDelete={handleDelete}
                                onContact={handleContact}
                                onClose={onClose}
                            />
                        </DialogFooter>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
