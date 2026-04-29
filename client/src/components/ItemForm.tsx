import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import LocationMap from "@/components/LocationMap";

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { MapPin, Search, Package, Plus, X } from "lucide-react";
import { toast } from "sonner";

import api from "@/lib/api";

const CATEGORIES = [
    "Electronics",
    "Pets",
    "Documents",
    "ID",
    "Wallet",
    "Keys",
    "Clothing",
    "Other",
];
const CONTACT_METHODS = ["Email", "Phone", "Social Media"];

const DEFAULT_STATE = {
    title: "",
    category: "Other",
    description: "",
    type: "Lost",
    location: { name: "", coordinates: { lat: 0, lng: 0 } },
    contactPreference: { method: "Email", value: "" },
};

const mapDataToState = (data?: any) => {
    if (!data) return DEFAULT_STATE;
    return {
        title: data.title || "",
        category: data.category || "Other",
        description: data.description || "",
        type: data.type || "Lost",
        location: {
            name: data.location?.name || "",
            coordinates: {
                lat: data.location?.coordinates?.lat || 0,
                lng: data.location?.coordinates?.lng || 0,
            },
        },
        contactPreference: {
            method: data.contactPreference?.method || "Email",
            value: data.contactPreference?.value || "",
        },
    };
};

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

    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);

    const [formData, setFormData] = useState(() => mapDataToState(initialData));

    useEffect(() => {
        setFormData(mapDataToState(initialData));

        if (initialData?.images?.length > 0) {
            setExistingImages(initialData.images);
            setPreviews(initialData.images);
        } else {
            setExistingImages([]);
            setPreviews([]);
        }
        setSelectedFiles([]);
    }, [initialData]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const filesArray = Array.from(e.target.files);
        if (
            existingImages.length + selectedFiles.length + filesArray.length >
            3
        ) {
            toast.error("You can only upload up to 3 images total");
            return;
        }

        setSelectedFiles((prev) => [...prev, ...filesArray]);
        setPreviews((prev) => [
            ...prev,
            ...filesArray.map((f) => URL.createObjectURL(f)),
        ]);
    };

    const removeImage = (index: number) => {
        if (index < existingImages.length) {
            setExistingImages((prev) => prev.filter((_, i) => i !== index));
        } else {
            const fileIndex = index - existingImages.length;
            setSelectedFiles((prev) => prev.filter((_, i) => i !== fileIndex));
        }
        setPreviews((prev) => prev.filter((_, i) => i !== index));
    };

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
                    <div className="space-y-3">
                        <Label>Report Type</Label>

                        <RadioGroup
                            value={formData.type}
                            onValueChange={(val) =>
                                setFormData({ ...formData, type: val })
                            }
                            className="grid grid-cols-2 gap-4"
                        >
                            <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer hover:bg-muted">
                                <RadioGroupItem value="Lost" />
                                <Search size={18} />
                                Lost Item
                            </label>

                            <label className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer hover:bg-muted">
                                <RadioGroupItem value="Found" />
                                <Package size={18} />
                                Found Item
                            </label>
                        </RadioGroup>
                    </div>

                    <Separator />

                    {/* TITLE + CATEGORY */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Item Title</Label>
                            <Input
                                placeholder="e.g. Black Wallet"
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        title: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Category</Label>

                            <Select
                                value={formData.category}
                                onValueChange={(val) =>
                                    setFormData({ ...formData, category: val })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>

                                <SelectContent>
                                    {CATEGORIES.map((cat) => (
                                        <SelectItem key={cat} value={cat}>
                                            {cat}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* DESCRIPTION */}

                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                            placeholder="Describe the item (color, brand, unique marks)..."
                            rows={4}
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    description: e.target.value,
                                })
                            }
                            required
                        />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                        <Label>Upload Images (Max 3)</Label>

                        <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                            {previews.map((url, index) => (
                                <div
                                    key={url}
                                    className="relative aspect-square rounded-md border overflow-hidden group"
                                >
                                    <img
                                        src={url}
                                        alt="preview"
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute top-0 right-0 bg-primary text-background text-p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            ))}

                            {previews.length < 3 && (
                                <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed rounded-md cursor-pointer hover:bg-muted transition-colors">
                                    <Plus
                                        size={24}
                                        className="text-muted-foreground"
                                    />
                                    <span className="text-[10px] uppercase font-bold text-muted-foreground mt-1">
                                        Add
                                    </span>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                </label>
                            )}
                        </div>
                    </div>

                    <Separator />

                    {/* LOCATION */}

                    <div className="space-y-4">
                        <Label>Location</Label>

                        {/* Location Name */}
                        <div className="space-y-2">
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                                <Input
                                    className="pl-9"
                                    placeholder="e.g. Biñan Bayan"
                                    value={formData.location.name}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            location: {
                                                ...formData.location,
                                                name: e.target.value,
                                            },
                                        })
                                    }
                                    required
                                />
                            </div>
                        </div>

                        {/* Map Picker */}
                        <div className="space-y-2">
                            <div className="w-full h-65 rounded-lg border overflow-hidden">
                                <LocationMap
                                    initialPosition={
                                        formData.location.coordinates
                                    }
                                    onSelect={(lat, lng) => {
                                        setFormData({
                                            ...formData,
                                            location: {
                                                ...formData.location,
                                                coordinates: { lat, lng },
                                            },
                                        });
                                    }}
                                />
                            </div>

                            {formData.location.coordinates.lat !== 0 && (
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                    <span>
                                        {formData.location.coordinates.lat.toFixed(
                                            4,
                                        )}
                                        ,{" "}
                                        {formData.location.coordinates.lng.toFixed(
                                            4,
                                        )}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    <Separator />

                    {/* CONTACT */}

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Contact Method</Label>

                            <Select
                                value={formData.contactPreference.method}
                                onValueChange={(val) =>
                                    setFormData({
                                        ...formData,
                                        contactPreference: {
                                            ...formData.contactPreference,
                                            method: val,
                                        },
                                    })
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select method">
                                        {formData.contactPreference.method}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {CONTACT_METHODS.map((method) => (
                                        <SelectItem key={method} value={method}>
                                            {method}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Contact Details</Label>

                            <Input
                                placeholder="Email, phone number, or social link"
                                value={formData.contactPreference.value}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        contactPreference: {
                                            ...formData.contactPreference,
                                            value: e.target.value,
                                        },
                                    })
                                }
                            />
                        </div>
                    </div>
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
