import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

import api from "@/lib/api";
import { mapDataToState } from "@/lib/utils";
import { useImageUpload } from "@/hooks/useImageUpload";

import TypeSection from "./sections/TypeSection";
import DetailSection from "./sections/DetailSection";
import ImgUploadSection from "./sections/ImgUploadSection";
import LocationSection from "./sections/LocationSection";
import ContactSection from "./sections/ContactSection";

export default function ItemForm({
    onRefresh,
    initialData,
    onCancel,
}: {
    onRefresh: () => void;
    initialData?: any;
    onCancel?: () => void;
}) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(() => mapDataToState(initialData));

    const {
        existingImages,
        selectedFiles,
        previews,
        handleFileChange,
        removeImage,
    } = useImageUpload(initialData?.images || [], 3);

    useEffect(() => {
        setFormData(mapDataToState(initialData));
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();
            data.append("title", formData.title);
            data.append("category", formData.category);
            data.append("description", formData.description);
            data.append("type", formData.type);
            data.append("location", JSON.stringify(formData.location));
            data.append(
                "contactPreference",
                JSON.stringify(formData.contactPreference),
            );

            data.append("existingImages", JSON.stringify(existingImages));
            selectedFiles.forEach((file) => data.append("images", file));

            if (initialData?._id) {
                await api.put(`/items/${initialData._id}`, data);
                toast.success("Item updated!");
            } else {
                await api.post("/items", data);
                toast.success("Item reported!");
            }

            onRefresh();
        } catch (error: any) {
            toast.error(
                error.response?.data?.message || "Something went wrong",
            );
        } finally {
            setLoading(false);
        }
    };

    const isEditing = !!initialData;

    return (
        <Card className="w-full max-w-4xl mx-auto shadow-sm border-muted">
            <CardHeader>
                <CardTitle>
                    {isEditing ? "Edit Report" : "Report an Item"}
                </CardTitle>
                <CardDescription>
                    {isEditing
                        ? "Update your item details below."
                        : "Submit details to help reunite items with their owners."}
                </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                    {/* TYPE */}
                    <TypeSection
                        value={formData.type}
                        onChange={(newType) =>
                            setFormData({ ...formData, type: newType })
                        }
                    />

                    <Separator />

                    {/* DETAILS */}
                    <DetailSection
                        title={formData.title}
                        category={formData.category}
                        description={formData.description}
                        onTitleChange={(val) =>
                            setFormData({ ...formData, title: val })
                        }
                        onCategoryChange={(val) =>
                            setFormData({ ...formData, category: val })
                        }
                        onDescriptionChange={(val) =>
                            setFormData({ ...formData, description: val })
                        }
                    />

                    <Separator />

                    {/* IMAGE UPLOAD */}
                    <ImgUploadSection
                        previews={previews}
                        removeImage={removeImage}
                        handleFileChange={handleFileChange}
                    />

                    <Separator />

                    {/* LOCATION */}
                    <LocationSection
                        name={formData.location.name}
                        onChange={(newName) =>
                            setFormData({
                                ...formData,
                                location: {
                                    ...formData.location,
                                    name: newName,
                                },
                            })
                        }
                        coordinates={formData.location.coordinates}
                        onSelect={(newCoords) =>
                            setFormData({
                                ...formData,
                                location: {
                                    ...formData.location,
                                    coordinates: newCoords,
                                },
                            })
                        }
                    />
                    <Separator />

                    {/* CONTACT */}
                    <ContactSection
                        method={formData.contactPreference.method}
                        value={formData.contactPreference.value}
                        onMethodChange={(newMethod) =>
                            setFormData({
                                ...formData,
                                contactPreference: {
                                    ...formData.contactPreference,
                                    method: newMethod,
                                },
                            })
                        }
                        onValueChange={(newValue) =>
                            setFormData({
                                ...formData,
                                contactPreference: {
                                    ...formData.contactPreference,
                                    value: newValue,
                                },
                            })
                        }
                    />
                </CardContent>

                <CardFooter
                    className={`flex flex-row items-center gap-3 ${isEditing ? "pt-6" : "pt-0"}`}
                >
                    {isEditing && (
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1"
                            onClick={onCancel}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                    )}
                    <Button
                        type="submit"
                        className={isEditing ? "flex-1" : "w-full mt-4"}
                        disabled={loading}
                    >
                        {loading
                            ? "Saving..."
                            : isEditing
                              ? "Save Changes"
                              : "Submit Report"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
