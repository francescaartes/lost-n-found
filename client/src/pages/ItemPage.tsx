import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useItemActions } from "@/hooks/useItemActions";
import api from "@/lib/api";

import ItemView from "@/components/ItemView/ItemView";
import ItemHeader from "@/components/ItemView/sections/ItemHeader";
import ItemActions from "@/components/ItemView/sections/ItemActions";
import ItemForm from "@/components/ReportForm/ItemForm";
import { Loader2 } from "lucide-react";

export default function ItemPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [item, setItem] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    const fetchItem = async () => {
        setIsLoading(true);
        try {
            const res = await api.get(`/items/${id}`);
            setItem(res.data);
        } catch (error) {
            console.error("Failed to fetch item");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchItem();
    }, [id]);

    const isOwner = user?._id === item?.postedBy?._id;
    const { isProcessing, handleDelete, handleStatusUpdate, handleContact } =
        useItemActions(item, {
            onDeleteSuccess: () => navigate("/"),
            onUpdateSuccess: () => fetchItem(),
        });

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!item) {
        return (
            <div className="flex h-full flex-col items-center justify-center text-muted-foreground">
                <h2 className="text-xl font-semibold">Report Not Found</h2>
                <p>The item you are looking for may have been deleted.</p>
            </div>
        );
    }

    return (
        <div className="container max-w-3xl mx-auto py-8 px-4">
            {isEditing ? (
                <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                    <h2 className="text-2xl font-bold mb-6">Edit Report</h2>
                    <ItemForm
                        initialData={item}
                        onCancel={() => setIsEditing(false)}
                        onRefresh={() => {
                            setIsEditing(false);
                            fetchItem();
                        }}
                    />
                </div>
            ) : (
                <>
                    <ItemHeader item={item} />
                    <div className="my-6">
                        <ItemView item={item} />
                    </div>
                    <div className="border-t border-border pt-6">
                        <ItemActions
                            item={item}
                            isOwner={isOwner}
                            isProcessing={isProcessing}
                            onEdit={() => setIsEditing(true)}
                            onToggleStatus={handleStatusUpdate}
                            onDelete={handleDelete}
                            onContact={handleContact}
                        />
                    </div>
                </>
            )}
        </div>
    );
}
