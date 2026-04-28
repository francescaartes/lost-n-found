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
import { MapPin, Search, Package } from "lucide-react";
import { toast } from "sonner";

import api from "@/lib/api";

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

    const defaultState = {
        title: "",
        category: "Other",
        description: "",
        type: "Lost",
        location: {
            name: "",
            coordinates: {
                lat: 0,
                lng: 0,
            },
        },
        contactPreference: {
            method: "Email",
            value: "",
        },
    };

    const [formData, setFormData] = useState(() => {
        if (initialData) {
            return {
                title: initialData.title || "",
                category: initialData.category || "Other",
                description: initialData.description || "",
                type: initialData.type || "Lost",
                location: {
                    name: initialData.location?.name || "",
                    coordinates: {
                        lat: initialData.location?.coordinates?.lat || 0,
                        lng: initialData.location?.coordinates?.lng || 0,
                    },
                },
                contactPreference: {
                    method: initialData.contactPreference?.method || "Email",
                    value: initialData.contactPreference?.value || "",
                },
            };
        }
        return defaultState;
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || "",
                category: initialData.category || "Other",
                description: initialData.description || "",
                type: initialData.type || "Lost",
                location: {
                    name: initialData.location?.name || "",
                    coordinates: {
                        lat: initialData.location?.coordinates?.lat || 0,
                        lng: initialData.location?.coordinates?.lng || 0,
                    },
                },
                contactPreference: {
                    method: initialData.contactPreference?.method || "Email",
                    value: initialData.contactPreference?.value || "",
                },
            });
        } else {
            setFormData(defaultState);
        }
    }, [initialData]);

    const categories = [
        "Electronics",
        "Pets",
        "Documents",
        "ID",
        "Wallet",
        "Keys",
        "Clothing",
        "Other",
    ];

    const contactMethods = ["Email", "Phone", "Social Media"];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (initialData?._id) {
                // EDIT MODE
                await api.put(`/items/${initialData._id}`, formData);
                toast.success("Item updated successfully!");
                if (onCancel) onCancel(); // Close modal if editing
            } else {
                // CREATE MODE
                await api.post("/items", formData);
                toast.success("Item reported successfully!");
                setFormData(defaultState); // Reset form only if creating
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
                                    {categories.map((cat) => (
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
                                    {contactMethods.map((method) => (
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
